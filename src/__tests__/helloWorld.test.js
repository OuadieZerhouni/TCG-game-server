const assert = require('assert');

describe('helloWorld', () => {
    it('should return "Hello, World!"', () => {
        assert.strictEqual(helloWorld(), 'Hello, World!');
    });

    it('should not return an empty string', () => {
        assert.notStrictEqual(helloWorld(), '');
    });

    it('should return a string', () => {
        assert.strictEqual(typeof helloWorld(), 'string');
    });
});

function helloWorld() {
    return 'Hello, World!';
}

