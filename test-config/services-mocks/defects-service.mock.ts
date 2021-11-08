import { DefectsService } from '@providers/defects/defects.service';

export class DefectsServiceMock {
  createDefect() {
    return {};
  }

  searchDefect(items, value, types: string[]) {
    return DefectsService.prototype.searchDefect(items, value, types);
  }

  orderDefectsArray(array, property, type) {
    return array.sort((a, b) => a.itemNumber - b.itemNumber);
  }
}
