import { Tile } from './tile';

describe('Tile', () => {
    it('should create an instance', () => {
        expect(new Tile(0, 0, true)).toBeTruthy();
    });
});