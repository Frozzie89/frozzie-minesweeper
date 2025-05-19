import { TileMatrix } from './tile-matrix';

describe('TileMatrix', () => {
    it('should create an instance', () => {
        expect(new TileMatrix()).toBeTruthy();
    });

    it('dimensions are correct', () => {
        const tileMatrix = new TileMatrix();
        tileMatrix.init(5, 10);
        expect(tileMatrix.matrix.length).toEqual(5);
        expect(tileMatrix.matrix[0].length).toEqual(10);
    })
});
