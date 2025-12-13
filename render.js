/**
 * Multi-Product Rendering System
 *
 * This system automatically renders product-specific content based on the loaded configuration.
 * Works in conjunction with config.js to create dynamic, multi-product landing pages.
 *
 * Usage:
 * - Add data-config="path.to.value" to HTML elements to auto-populate
 * - Add data-show-if="path.to.boolean" to conditionally show/hide elements
 * - Use special data-render attributes for complex rendering (lists, etc.)
 */

(function() {
    'use strict';

    // Wait for product config to be ready
    document.addEventListener('productConfigReady', function(e) {
        console.log('🎨 Starting page rendering...');
        console.log('📦 Product:', e.detail.productId);

        renderPage();
    });

    /**
     * Main rendering function
     */
    function renderPage() {
        const config = window.PRODUCT_CONFIG;

        if (!config) {
            console.error('❌ No product configuration available');
            return;
        }

        try {
            // 1. Update meta tags and title
            updateMetaTags();

            // 2. Apply custom colors
            applyColors();

            // 3. Render simple text content (data-config attributes)
            renderTextContent();

            // 4. Render conditional elements (data-show-if attributes)
            renderConditionalElements();

            // 5. Render complex lists and components
            renderPricingPackages();
            renderTestimonials();
            renderIngredients();
            renderBenefits();
            renderBonuses();
            renderFAQ();
            renderTrustBadges();
            renderHeaderTrustBadges();
            renderSocialProofNotifications();

            // 6. Setup tracking and CTAs
            setupTrackingLinks();

            // 7. Apply countdown timer if enabled
            if (config.countdown && config.countdown.enabled) {
                setupCountdownTimer(config.countdown.hours);
            }

            // 8. Apply stock counter if enabled
            if (config.hero.productCard.stock && config.hero.productCard.stock.enabled) {
                setupStockCounter(config.hero.productCard.stock);
            }

            // 9. Setup exit intent if enabled
            if (config.exitIntent && config.exitIntent.enabled) {
                setupExitIntent();
            }

            console.log('✅ Page rendering complete!');

        } catch (error) {
            console.error('❌ Error during rendering:', error);
        }
    }

    /**
     * Update document meta tags and title
     */
    function updateMetaTags() {
        const meta = window.getConfig('meta');

        if (!meta) return;

        // Update title
        if (meta.title) {
            document.title = meta.title;
        }

        // Update meta description
        setMetaTag('description', meta.description);

        // Update theme color
        if (meta.themeColor) {
            setMetaTag('theme-color', meta.themeColor);
        }

        // Update OG tags
        setMetaTag('og:title', meta.title, 'property');
        setMetaTag('og:description', meta.description, 'property');
        if (meta.ogImage) {
            setMetaTag('og:image', meta.ogImage, 'property');
        }

        // Update Twitter tags
        setMetaTag('twitter:title', meta.title, 'property');
        setMetaTag('twitter:description', meta.description, 'property');
        if (meta.ogImage) {
            setMetaTag('twitter:image', meta.ogImage, 'property');
        }

        console.log('✅ Meta tags updated');
    }

    function setMetaTag(name, content, attribute = 'name') {
        if (!content) return;

        let meta = document.querySelector(`meta[${attribute}="${name}"]`);

        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute(attribute, name);
            document.head.appendChild(meta);
        }

        meta.setAttribute('content', content);
    }

    /**
     * Apply custom brand colors
     */
    function applyColors() {
        const colors = window.getConfig('colors');

        if (!colors) return;

        const root = document.documentElement;

        if (colors.primary) root.style.setProperty('--primary', colors.primary);
        if (colors.secondary) root.style.setProperty('--secondary', colors.secondary);
        if (colors.accent) root.style.setProperty('--accent', colors.accent);
        if (colors.danger) root.style.setProperty('--danger', colors.danger);

        console.log('✅ Custom colors applied');
    }

    /**
     * Render simple text content using data-config attributes
     */
    function renderTextContent() {
        const elements = document.querySelectorAll('[data-config]');

        elements.forEach(el => {
            const path = el.getAttribute('data-config');
            const value = window.getConfig(path);

            if (value !== null && value !== undefined) {
                if (el.tagName === 'IMG') {
                    el.src = value;
                } else if (el.tagName === 'A') {
                    if (el.getAttribute('data-config-attr') === 'href') {
                        el.href = value;
                    } else {
                        el.innerHTML = value;
                    }
                } else {
                    el.innerHTML = value;
                }
            }
        });

        console.log('✅ Text content rendered');
    }

    /**
     * Show/hide elements based on data-show-if attributes
     */
    function renderConditionalElements() {
        const elements = document.querySelectorAll('[data-show-if]');

        elements.forEach(el => {
            const path = el.getAttribute('data-show-if');
            const shouldShow = window.isFeatureEnabled(path.replace('.enabled', ''));

            if (!shouldShow) {
                el.style.display = 'none';
            }
        });

        console.log('✅ Conditional elements processed');
    }

    /**
     * Render pricing packages
     */
    function renderPricingPackages() {
        const container = document.querySelector('[data-render="pricing-packages"]');
        if (!container) return;

        const packages = window.getConfig('pricing.packages', []);
        container.innerHTML = '';

        packages.forEach(pkg => {
            const card = createPricingCard(pkg);
            container.appendChild(card);
        });

        console.log('✅ Pricing packages rendered');
    }

    function createPricingCard(pkg) {
        const featured = pkg.featured ? 'featured' : '';
        const badge = pkg.badge ? `<span class="card-badge">${pkg.badge}</span>` : '';
        const bonuses = pkg.bonuses ? '<span class="bonus-badge">+ 3 FREE BONUSES</span>' : '<div class="no-bonus">No bonuses</div>';

        const card = document.createElement('article');
        card.className = `pricing-card ${featured}`;
        card.innerHTML = `
            ${badge}
            <h3 class="card-title">${pkg.title}</h3>
            <p class="card-subtitle">${pkg.subtitle}</p>
            <div class="product-image"><img src="${pkg.image}" alt="${pkg.title}" width="120" height="120" loading="lazy"></div>
            <div class="price-container"><span class="price">$${pkg.pricePerBottle}</span><span class="price-label">Per Bottle</span></div>
            <div class="savings">${pkg.savings}</div>
            ${bonuses}
            <a href="javascript:void(0);" onclick="trackConversion('${pkg.id}'); return false;" class="cta-button">Add To Cart</a>
            <div class="payment-methods">
                <span class="payment-icon" data-card="mastercard">MC</span>
                <span class="payment-icon" data-card="visa">VISA</span>
                <span class="payment-icon" data-card="amex">AMEX</span>
                <span class="payment-icon" data-card="discover">DISC</span>
            </div>
            <p class="total-price">TOTAL: <span class="old-price">$${pkg.oldTotal}</span> <span class="new-price">$${pkg.newTotal}</span></p>
            <p class="shipping-info ${pkg.shippingFree ? '' : 'paid'}">${pkg.shipping}</p>
            <p class="guarantee">${window.getConfig('guarantee.days', 90)} Day Money-Back Guarantee</p>
        `;

        return card;
    }

    /**
     * Render testimonials
     */
    function renderTestimonials() {
        const container = document.querySelector('[data-render="testimonials"]');
        if (!container) return;

        const testimonials = window.getConfig('testimonials.items', []);
        container.innerHTML = '';

        testimonials.forEach(testimonial => {
            const card = createTestimonialCard(testimonial);
            container.appendChild(card);
        });

        console.log('✅ Testimonials rendered');
    }

    function createTestimonialCard(testimonial) {
        const stars = '★'.repeat(testimonial.stars);
        const verified = testimonial.verified ? '<div class="testimonial-verified">✓ Verified Purchase</div>' : '';

        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <div class="testimonial-header">
                <div class="testimonial-avatar">${testimonial.initials}</div>
                <div>
                    <div class="testimonial-name">${testimonial.name}</div>
                    <div class="testimonial-location">${testimonial.location}</div>
                    <div class="testimonial-stars">${stars}</div>
                </div>
            </div>
            <p class="testimonial-text">"${testimonial.text}"</p>
            ${verified}
        `;

        return card;
    }

    /**
     * Render ingredients
     */
    function renderIngredients() {
        const container = document.querySelector('[data-render="ingredients"]');
        if (!container) return;

        const ingredients = window.getConfig('ingredients.items', []);
        container.innerHTML = '';

        ingredients.forEach(ingredient => {
            const card = createIngredientCard(ingredient);
            container.appendChild(card);
        });

        console.log('✅ Ingredients rendered');
    }

    function createIngredientCard(ingredient) {
        const card = document.createElement('div');
        card.className = 'ingredient-card';
        card.innerHTML = `
            <h3 class="ingredient-name">${ingredient.name}</h3>
            <p class="ingredient-description">${ingredient.description}</p>
        `;

        return card;
    }

    /**
     * Render benefits
     */
    function renderBenefits() {
        const container = document.querySelector('[data-render="benefits"]');
        if (!container) return;

        const benefits = window.getConfig('benefits.items', []);
        container.innerHTML = '';

        benefits.forEach(benefit => {
            const card = createBenefitCard(benefit);
            container.appendChild(card);
        });

        console.log('✅ Benefits rendered');
    }

    function createBenefitCard(benefit) {
        const card = document.createElement('div');
        card.className = 'benefit-card';
        card.innerHTML = `
            <div class="benefit-icon">${benefit.icon}</div>
            <h3 class="benefit-title">${benefit.title}</h3>
            <p class="benefit-description">${benefit.description}</p>
        `;

        return card;
    }

    /**
     * Render bonuses
     */
    function renderBonuses() {
        const container = document.querySelector('[data-render="bonuses"]');
        if (!container) return;

        const bonuses = window.getConfig('bonuses.items', []);
        container.innerHTML = '';

        bonuses.forEach(bonus => {
            const card = createBonusCard(bonus);
            container.appendChild(card);
        });

        console.log('✅ Bonuses rendered');
    }

    function createBonusCard(bonus) {
        const card = document.createElement('div');
        card.className = 'bonus-card';
        card.innerHTML = `
            <span class="bonus-badge-top">${bonus.badge}</span>
            <div class="bonus-icon">${bonus.icon}</div>
            <h3 class="bonus-title">${bonus.title}</h3>
            <p class="bonus-subtitle">${bonus.subtitle}</p>
        `;

        return card;
    }

    /**
     * Render FAQ
     */
    function renderFAQ() {
        const container = document.querySelector('[data-render="faq"]');
        if (!container) return;

        const faqItems = window.getConfig('faq.items', []);
        container.innerHTML = '';

        faqItems.forEach(item => {
            const faqItem = createFAQItem(item);
            container.appendChild(faqItem);
        });

        console.log('✅ FAQ rendered');
    }

    function createFAQItem(item) {
        const div = document.createElement('div');
        div.className = 'faq-item';
        div.innerHTML = `
            <h3 class="faq-question">${item.question}</h3>
            <p class="faq-answer">${item.answer}</p>
        `;

        return div;
    }

    /**
     * Render trust badges
     */
    function renderTrustBadges() {
        const container = document.querySelector('[data-render="trust-badges"]');
        if (!container) return;

        const badges = window.getConfig('trustBadges', []);
        container.innerHTML = '';

        badges.forEach(badge => {
            const div = createTrustBadge(badge);
            container.appendChild(div);
        });

        console.log('✅ Trust badges rendered');
    }

    function createTrustBadge(badge) {
        const div = document.createElement('div');
        div.className = 'trust-badge';
        div.innerHTML = `
            <div class="trust-icon">${badge.icon}</div>
            <div class="trust-title">${badge.title}</div>
            <div class="trust-description">${badge.description}</div>
        `;

        return div;
    }

    /**
     * Render header trust badges
     */
    function renderHeaderTrustBadges() {
        const container = document.querySelector('[data-render="header-trust"]');
        if (!container) return;

        const badges = window.getConfig('header.trustBadges', []);
        container.innerHTML = '';

        badges.forEach(badge => {
            const div = document.createElement('div');
            div.className = 'trust-item';
            div.innerHTML = `<span class="icon">${badge.icon}</span><span>${badge.text}</span>`;
            container.appendChild(div);
        });
    }

    /**
     * Render social proof notifications data
     */
    function renderSocialProofNotifications() {
        // This will be used by the social proof script
        const notifications = window.getConfig('socialProof.notifications', []);
        window.SOCIAL_PROOF_DATA = notifications;
    }

    /**
     * Setup tracking links
     */
    function setupTrackingLinks() {
        const clickbankLink = window.getConfig('tracking.clickbankLink');

        // Make trackConversion function global
        window.trackConversion = function(packageType) {
            console.log('🔔 trackConversion called with:', packageType);

            // Get package value
            const packages = window.getConfig('pricing.packages', []);
            const pkg = packages.find(p => p.id === packageType);
            const value = pkg ? pkg.newTotal : 0;

            const transactionId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);

            console.log('💰 Value:', value, 'USD');
            console.log('🆔 Transaction ID:', transactionId);

            // Check if gtag is available
            const googleAdsId = window.getConfig('tracking.googleAdsId');
            const conversionLabel = window.getConfig('tracking.googleAdsConversionLabel');

            if (typeof gtag !== 'undefined' && googleAdsId && conversionLabel) {
                console.log('✅ gtag found, firing conversion event...');

                try {
                    gtag('event', 'conversion', {
                        'send_to': `${googleAdsId}/${conversionLabel}`,
                        'transaction_id': transactionId,
                        'value': value,
                        'currency': 'USD',
                        'event_callback': function() {
                            console.log('✅ Conversion tracked successfully! Redirecting...');
                            window.location.href = clickbankLink;
                        }
                    });

                    console.log('📤 Conversion event sent to Google Ads');
                } catch (error) {
                    console.error('❌ Error tracking conversion:', error);
                }

                // Fallback redirect
                setTimeout(function() {
                    console.log('⏱️ Fallback redirect triggered');
                    window.location.href = clickbankLink;
                }, 1500);
            } else {
                console.warn('⚠️ gtag not loaded, redirecting immediately');
                window.location.href = clickbankLink;
            }
        };

        console.log('✅ Tracking setup complete');
    }

    /**
     * Setup countdown timer
     */
    function setupCountdownTimer(hours) {
        const endTime = new Date().getTime() + (hours * 60 * 60 * 1000);

        function updateTimer() {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance < 0) {
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
                return;
            }

            const hrs = Math.floor(distance / (1000 * 60 * 60));
            const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('hours').textContent = String(hrs).padStart(2, '0');
            document.getElementById('minutes').textContent = String(mins).padStart(2, '0');
            document.getElementById('seconds').textContent = String(secs).padStart(2, '0');
        }

        updateTimer();
        setInterval(updateTimer, 1000);
    }

    /**
     * Setup stock counter
     */
    function setupStockCounter(stockConfig) {
        const stockElement = document.getElementById('stock-count');
        if (!stockElement) return;

        let stock = stockConfig.initial;

        function updateStock() {
            if (stock > stockConfig.minimum && Math.random() < 0.3) {
                stock--;
                stockElement.textContent = stock;
            }
        }

        setInterval(updateStock, 45000);
    }

    /**
     * Setup exit intent popup
     */
    function setupExitIntent() {
        let exitPopupShown = false;

        function closeExitPopup() {
            document.getElementById('exitPopup').classList.remove('active');
        }

        window.closeExitPopup = closeExitPopup;

        document.addEventListener('mouseleave', function(e) {
            if (e.clientY < 10 && !exitPopupShown && window.innerWidth > 768) {
                document.getElementById('exitPopup').classList.add('active');
                exitPopupShown = true;
            }
        });

        document.getElementById('exitPopup').addEventListener('click', function(e) {
            if (e.target === this) {
                closeExitPopup();
            }
        });
    }

})();
