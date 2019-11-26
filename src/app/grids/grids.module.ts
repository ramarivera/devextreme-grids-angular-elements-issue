import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxDataGridModule, DxBulletModule, DxTemplateModule } from 'devextreme-angular';

import { GenericGridComponent } from './generic-grid/generic-grid.component';

@NgModule({
  declarations: [GenericGridComponent],
  exports: [GenericGridComponent],
  imports: [CommonModule, DxDataGridModule, DxBulletModule, DxTemplateModule]
})
export class GridsModule {}
