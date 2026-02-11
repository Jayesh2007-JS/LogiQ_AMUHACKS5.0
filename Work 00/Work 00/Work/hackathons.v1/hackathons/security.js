// Clickjacking Protection - Frame Busting
(function() {
    if (window.top !== window.self) {
        console.warn("Clickjacking attempt detected - breaking out of iframe.");
        window.top.location = window.self.location;
    }
})();

/**
 * SkillBridge AI - Frontend Security Utility Layer
 * 
 * This module provides reusable sanitization functions to prevent XSS attacks
 * and ensure safe DOM manipulation across the application.
 * 
 * @version 1.0.0
 * @author SkillBridge AI Security Team
 */

(function(window) {
    'use strict';

    /**
     * Sanitizes user input by escaping HTML special characters
     * 
     * This function prevents XSS attacks by converting potentially dangerous
     * characters into their HTML entity equivalents.
     * 
     * @param {*} input - The input value to sanitize (will be converted to string)
     * @returns {string} - Sanitized string safe for display
     * 
     * @example
     * sanitizeInput('<script>alert("XSS")</script>')
     * // Returns: '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'
     * 
     * @example
     * sanitizeInput('  Hello & Welcome  ')
     * // Returns: 'Hello &amp; Welcome'
     */
    function sanitizeInput(input) {
        if (input === null || input === undefined) {
            return '';
        }
        
        return String(input)
            .trim()
            .replace(/&/g, '&amp;')   // Must be first to prevent double escaping
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    /**
     * Safely sets text content on a DOM element with automatic sanitization
     * 
     * This function combines sanitization with safe DOM manipulation using
     * textContent instead of innerHTML to prevent XSS attacks.
     * 
     * @param {HTMLElement} element - The DOM element to update
     * @param {*} value - The value to set (will be sanitized)
     * @returns {boolean} - True if successful, false if element is invalid
     * 
     * @example
     * const div = document.getElementById('myDiv');
     * safeText(div, '<script>alert("XSS")</script>');
     * // Sets text content safely, displays as plain text
     * 
     * @example
     * const span = document.querySelector('.username');
     * safeText(span, userInput);
     * // Safely displays user input without XSS risk
     */
    function safeText(element, value) {
        // Validate element
        if (!element || !(element instanceof HTMLElement)) {
            console.error('safeText: Invalid element provided');
            return false;
        }

        // Sanitize the input value
        const sanitized = sanitizeInput(value);

        // Use textContent for safe assignment (automatically escapes HTML)
        element.textContent = sanitized;

        return true;
    }

    /**
     * Safely sets an attribute on a DOM element with sanitization
     * 
     * Prevents attribute-based XSS attacks by sanitizing values before
     * setting them as element attributes.
     * 
     * @param {HTMLElement} element - The DOM element to update
     * @param {string} attributeName - The name of the attribute to set
     * @param {*} value - The value to set (will be sanitized)
     * @returns {boolean} - True if successful, false if invalid
     * 
     * @example
     * const img = document.createElement('img');
     * safeAttribute(img, 'alt', userInput);
     * // Safely sets alt attribute with sanitized user input
     * 
     * @example
     * const link = document.querySelector('a');
     * safeAttribute(link, 'title', '<script>alert("XSS")</script>');
     * // Sets title attribute safely, XSS prevented
     */
    function safeAttribute(element, attributeName, value) {
        // Validate element
        if (!element || !(element instanceof HTMLElement)) {
            console.error('safeAttribute: Invalid element provided');
            return false;
        }

        // Validate attribute name
        if (!attributeName || typeof attributeName !== 'string') {
            console.error('safeAttribute: Invalid attribute name');
            return false;
        }

        // Sanitize the value
        const sanitized = sanitizeInput(value);

        // Set attribute safely
        element.setAttribute(attributeName, sanitized);

        return true;
    }

    /**
     * Creates a safe DOM element with sanitized text content
     * 
     * Factory function that creates a new element and safely sets its
     * text content in one operation.
     * 
     * @param {string} tagName - The HTML tag name (e.g., 'div', 'span', 'p')
     * @param {*} textContent - The text content to set (will be sanitized)
     * @param {string} [className] - Optional CSS class name(s) to add
     * @returns {HTMLElement|null} - The created element or null if invalid
     * 
     * @example
     * const span = createSafeElement('span', userInput, 'user-name');
     * document.body.appendChild(span);
     * // Creates <span class="user-name">sanitized content</span>
     * 
     * @example
     * const div = createSafeElement('div', '<script>alert("XSS")</script>');
     * // Creates div with XSS attempt displayed as plain text
     */
    function createSafeElement(tagName, textContent, className) {
        // Validate tag name
        if (!tagName || typeof tagName !== 'string') {
            console.error('createSafeElement: Invalid tag name');
            return null;
        }

        try {
            // Create element
            const element = document.createElement(tagName);

            // Set text content safely
            if (textContent !== undefined && textContent !== null) {
                safeText(element, textContent);
            }

            // Add class if provided
            if (className && typeof className === 'string') {
                element.className = className;
            }

            return element;
        } catch (error) {
            console.error('createSafeElement: Error creating element', error);
            return null;
        }
    }

    /**
     * Validates and sanitizes email addresses
     * 
     * Performs basic email validation and sanitization to prevent
     * injection attacks through email input fields.
     * 
     * @param {string} email - The email address to validate and sanitize
     * @returns {string|null} - Sanitized email or null if invalid
     * 
     * @example
     * sanitizeEmail('user@example.com')
     * // Returns: 'user@example.com'
     * 
     * @example
     * sanitizeEmail('user@example.com<script>alert("XSS")</script>')
     * // Returns: null (invalid email format)
     */
    function sanitizeEmail(email) {
        if (!email || typeof email !== 'string') {
            return null;
        }

        // Trim whitespace
        const trimmed = email.trim();

        // Basic email regex validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(trimmed)) {
            return null;
        }

        // Additional sanitization
        const sanitized = sanitizeInput(trimmed);

        // Ensure sanitization didn't change the email (no HTML entities in valid email)
        if (sanitized !== trimmed) {
            return null;
        }

        return sanitized;
    }

    /**
     * Validates and sanitizes numeric input
     * 
     * Ensures input is a valid number within optional min/max bounds.
     * 
     * @param {*} input - The input to validate as a number
     * @param {number} [min] - Optional minimum value
     * @param {number} [max] - Optional maximum value
     * @returns {number|null} - Valid number or null if invalid
     * 
     * @example
     * sanitizeNumber('25', 0, 100)
     * // Returns: 25
     * 
     * @example
     * sanitizeNumber('150', 0, 100)
     * // Returns: null (exceeds max)
     * 
     * @example
     * sanitizeNumber('<script>alert("XSS")</script>')
     * // Returns: null (not a number)
     */
    function sanitizeNumber(input, min, max) {
        // Convert to number
        const num = Number(input);

        // Check if valid number
        if (isNaN(num) || !isFinite(num)) {
            return null;
        }

        // Check min bound
        if (min !== undefined && num < min) {
            return null;
        }

        // Check max bound
        if (max !== undefined && num > max) {
            return null;
        }

        return num;
    }

    /**
     * Sanitizes and validates string length
     * 
     * Ensures string input doesn't exceed maximum length and contains
     * only allowed characters.
     * 
     * @param {string} input - The string to validate
     * @param {number} maxLength - Maximum allowed length
     * @param {RegExp} [allowedPattern] - Optional regex for allowed characters
     * @returns {string|null} - Sanitized string or null if invalid
     * 
     * @example
     * sanitizeString('Hello World', 50)
     * // Returns: 'Hello World'
     * 
     * @example
     * sanitizeString('A'.repeat(100), 50)
     * // Returns: null (exceeds max length)
     * 
     * @example
     * sanitizeString('Hello123', 50, /^[a-zA-Z]+$/)
     * // Returns: null (contains numbers, only letters allowed)
     */
    function sanitizeString(input, maxLength, allowedPattern) {
        if (typeof input !== 'string') {
            return null;
        }

        const trimmed = input.trim();

        // Check length
        if (maxLength && trimmed.length > maxLength) {
            return null;
        }

        // Check pattern if provided
        if (allowedPattern && !allowedPattern.test(trimmed)) {
            return null;
        }

        // Sanitize
        return sanitizeInput(trimmed);
    }

    /**
     * Generates a simple deterministic hash from a string
     * 
     * Creates a basic checksum by summing character codes with a simple
     * algorithm. Not cryptographically secure, but sufficient for detecting
     * tampering in localStorage.
     * 
     * @param {string} str - The string to hash
     * @returns {string} - Hexadecimal hash string
     * 
     * @example
     * generateHash('Hello World')
     * // Returns: '1c5d7e3f' (example hash)
     */
    function generateHash(str) {
        var hash = 0;
        var i;
        var chr;
        
        if (str.length === 0) {
            return '0';
        }
        
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash = hash & hash; // Convert to 32bit integer
        }
        
        // Convert to positive hex string
        return Math.abs(hash).toString(16);
    }

    /**
     * Securely stores data in localStorage with integrity protection
     * 
     * Wraps the data with a hash to detect tampering. The stored structure is:
     * { data: originalValue, hash: calculatedHash }
     * 
     * @param {string} key - The localStorage key
     * @param {*} value - The value to store (will be JSON stringified)
     * @returns {boolean} - True if successful, false otherwise
     * 
     * @example
     * secureSetItem('userProfile', { name: 'John', age: 25 })
     * // Stores data with integrity hash
     * 
     * @example
     * secureSetItem('token', 'abc123')
     * // Stores string with integrity protection
     */
    function secureSetItem(key, value) {
        if (!key || typeof key !== 'string') {
            console.error('secureSetItem: Invalid key provided');
            return false;
        }

        if (!window.localStorage) {
            console.error('secureSetItem: localStorage not available');
            return false;
        }

        try {
            // Convert value to JSON string
            var jsonData = JSON.stringify(value);
            
            // Generate hash of the data
            var hash = generateHash(jsonData);
            
            // Create wrapper object
            var wrapper = {
                data: value,
                hash: hash
            };
            
            // Store the wrapper
            localStorage.setItem(key, JSON.stringify(wrapper));
            
            return true;
        } catch (error) {
            console.error('secureSetItem: Error storing data', error);
            return false;
        }
    }

    /**
     * Securely retrieves data from localStorage with integrity verification
     * 
     * Retrieves data and verifies its integrity by recalculating and comparing
     * the hash. If tampering is detected, the corrupted entry is removed.
     * 
     * @param {string} key - The localStorage key
     * @returns {*} - The original value if valid, null if invalid or tampered
     * 
     * @example
     * var profile = secureGetItem('userProfile')
     * // Returns: { name: 'John', age: 25 } if valid
     * // Returns: null if tampered or not found
     * 
     * @example
     * var token = secureGetItem('token')
     * // Returns: 'abc123' if valid
     * // Returns: null and logs warning if tampered
     */
    function secureGetItem(key) {
        if (!key || typeof key !== 'string') {
            console.error('secureGetItem: Invalid key provided');
            return null;
        }

        if (!window.localStorage) {
            console.error('secureGetItem: localStorage not available');
            return null;
        }

        try {
            // Retrieve the stored value
            var storedValue = localStorage.getItem(key);
            
            if (storedValue === null) {
                return null;
            }
            
            // Parse the wrapper object
            var wrapper = JSON.parse(storedValue);
            
            // Validate wrapper structure
            if (!wrapper || typeof wrapper !== 'object' || !wrapper.hasOwnProperty('data') || !wrapper.hasOwnProperty('hash')) {
                console.warn('secureGetItem: Invalid data structure for key "' + key + '"');
                return null;
            }
            
            // Recalculate hash of the data
            var jsonData = JSON.stringify(wrapper.data);
            var calculatedHash = generateHash(jsonData);
            
            // Compare hashes
            if (calculatedHash !== wrapper.hash) {
                console.warn('LocalStorage tampering detected for key "' + key + '"');
                
                // Remove corrupted entry
                localStorage.removeItem(key);
                
                return null;
            }
            
            // Return the original data
            return wrapper.data;
            
        } catch (error) {
            console.error('secureGetItem: Error retrieving data', error);
            
            // Remove corrupted entry on parse error
            try {
                localStorage.removeItem(key);
            } catch (removeError) {
                // Ignore removal errors
            }
            
            return null;
        }
    }

    /**
     * Securely removes an item from localStorage
     * 
     * Wrapper for localStorage.removeItem for consistency with secure methods.
     * 
     * @param {string} key - The localStorage key to remove
     * @returns {boolean} - True if successful, false otherwise
     * 
     * @example
     * secureRemoveItem('userProfile')
     * // Removes the item from localStorage
     */
    function secureRemoveItem(key) {
        if (!key || typeof key !== 'string') {
            console.error('secureRemoveItem: Invalid key provided');
            return false;
        }

        if (!window.localStorage) {
            console.error('secureRemoveItem: localStorage not available');
            return false;
        }

        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('secureRemoveItem: Error removing item', error);
            return false;
        }
    }

    // Expose functions to global scope
    window.SecurityUtils = {
        sanitizeInput: sanitizeInput,
        safeText: safeText,
        safeAttribute: safeAttribute,
        createSafeElement: createSafeElement,
        sanitizeEmail: sanitizeEmail,
        sanitizeNumber: sanitizeNumber,
        sanitizeString: sanitizeString,
        secureSetItem: secureSetItem,
        secureGetItem: secureGetItem,
        secureRemoveItem: secureRemoveItem
    };

    // Also expose individual functions for convenience
    window.sanitizeInput = sanitizeInput;
    window.safeText = safeText;
    window.safeAttribute = safeAttribute;
    window.createSafeElement = createSafeElement;

    // Log initialization in development
    if (console && console.log) {
        console.log('✅ SkillBridge Security Utils loaded successfully');
    }

})(window);
