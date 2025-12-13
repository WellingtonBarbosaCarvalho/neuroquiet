/**
 * Multi-Product Configuration System
 *
 * This system automatically detects which product to load based on:
 * 1. Domain name (e.g., neuroquietoffer.online vs keyslimoffer.online)
 * 2. URL parameter (?product=neuroquiet or ?product=keyslim)
 * 3. URL path (/neuroquiet/ or /keyslim/)
 *
 * Usage:
 * - Include this file BEFORE your main HTML content
 * - Access product data via: window.PRODUCT_CONFIG
 * - The page will automatically load the correct product configuration
 */

(function() {
    'use strict';

    // ===== PRODUCT MAPPING =====
    const PRODUCT_MAP = {
        'neuroquiet': {
            domains: ['neuroquietoffer.online', 'www.neuroquietoffer.online'],
            configFile: './products/neuroquiet.json'
        },
        'keyslim': {
            domains: ['keyslimoffer.online', 'www.keyslimoffer.online'],
            configFile: './products/keyslim.json'
        }
    };

    // Default product (fallback)
    const DEFAULT_PRODUCT = 'neuroquiet';

    // ===== DETECTION FUNCTIONS =====

    /**
     * Get product ID from URL parameter (?product=xxx)
     */
    function getProductFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('product');
    }

    /**
     * Get product ID from URL path (/neuroquiet/ or /keyslim/)
     */
    function getProductFromPath() {
        const path = window.location.pathname;

        for (const productId in PRODUCT_MAP) {
            if (path.includes('/' + productId + '/')) {
                return productId;
            }
        }

        return null;
    }

    /**
     * Get product ID from domain name
     */
    function getProductFromDomain() {
        const hostname = window.location.hostname;

        for (const productId in PRODUCT_MAP) {
            if (PRODUCT_MAP[productId].domains.includes(hostname)) {
                return productId;
            }
        }

        return null;
    }

    /**
     * Detect which product to load (priority: URL param > Path > Domain > Default)
     */
    function detectProduct() {
        return getProductFromURL() ||
               getProductFromPath() ||
               getProductFromDomain() ||
               DEFAULT_PRODUCT;
    }

    // ===== CONFIGURATION LOADER =====

    /**
     * Load product configuration from JSON file
     */
    async function loadProductConfig(productId) {
        const productInfo = PRODUCT_MAP[productId];

        if (!productInfo) {
            console.error('❌ Unknown product:', productId);
            console.log('📋 Available products:', Object.keys(PRODUCT_MAP));
            return null;
        }

        try {
            console.log('🔍 Loading product configuration:', productId);
            console.log('📄 Config file:', productInfo.configFile);

            const response = await fetch(productInfo.configFile);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const config = await response.json();

            console.log('✅ Product configuration loaded successfully');
            console.log('📦 Product name:', config.productName);

            return config;

        } catch (error) {
            console.error('❌ Error loading product configuration:', error);
            console.error('   File:', productInfo.configFile);
            return null;
        }
    }

    // ===== INITIALIZATION =====

    /**
     * Initialize the product configuration system
     */
    async function init() {
        console.log('🚀 Multi-Product System Initializing...');
        console.log('🌐 Hostname:', window.location.hostname);
        console.log('📍 Path:', window.location.pathname);
        console.log('🔗 Search:', window.location.search);

        // Detect product
        const productId = detectProduct();
        console.log('🎯 Detected product:', productId);

        // Load configuration
        const config = await loadProductConfig(productId);

        if (!config) {
            console.error('❌ Failed to load product configuration');
            return;
        }

        // Store in global scope
        window.PRODUCT_CONFIG = config;
        window.PRODUCT_ID = productId;

        // Dispatch event to notify that config is ready
        const event = new CustomEvent('productConfigReady', {
            detail: {
                productId: productId,
                config: config
            }
        });
        document.dispatchEvent(event);

        console.log('✅ Multi-Product System Ready');
        console.log('📊 Access config via: window.PRODUCT_CONFIG');
    }

    // ===== HELPER FUNCTIONS =====

    /**
     * Get a nested property from config using dot notation
     * Example: getConfig('pricing.packages.0.price')
     */
    window.getConfig = function(path, defaultValue = null) {
        if (!window.PRODUCT_CONFIG) {
            console.warn('⚠️ Product config not loaded yet');
            return defaultValue;
        }

        const keys = path.split('.');
        let value = window.PRODUCT_CONFIG;

        for (const key of keys) {
            if (value === null || value === undefined) {
                return defaultValue;
            }
            value = value[key];
        }

        return value !== undefined ? value : defaultValue;
    };

    /**
     * Check if a feature is enabled
     */
    window.isFeatureEnabled = function(featurePath) {
        const enabled = window.getConfig(featurePath + '.enabled', false);
        return enabled === true;
    };

    // ===== AUTO-START =====

    // Start initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
