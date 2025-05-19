import { TileNumberDisplayPipe } from './tile-number-display.pipe';

describe('TileNumberDisplayPipe', () => {
    it('create an instance', () => {
        const pipe = new TileNumberDisplayPipe();
        expect(pipe).toBeTruthy();
    });

    it('0 becomes an empty string', () => {
        const pipe = new TileNumberDisplayPipe();
        expect(pipe.transform(0)).toBe('');
    });

    it('any number other than 0 becomes string of that number', () => {
        const pipe = new TileNumberDisplayPipe();
        expect(pipe.transform(1)).toBe('1');
    });
});
