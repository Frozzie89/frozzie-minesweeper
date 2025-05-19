import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tileNumberDisplay'
})
export class TileNumberDisplayPipe implements PipeTransform {

    transform(value: number): string {
        if (value == 0) {
            return ''
        }
        return String(value)
    }

}
