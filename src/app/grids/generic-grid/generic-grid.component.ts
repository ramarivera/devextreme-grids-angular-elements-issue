import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef
} from '@angular/core';

import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';

import { DxDataGridComponent } from 'devextreme-angular';

import { DataColumn } from '../data-column.model';

type DataGridColumn = import('devextreme').default.ui.dxDataGridColumn;

@Component({
  selector: 'app-generic-grid',
  templateUrl: './generic-grid.component.html',
  styleUrls: ['./generic-grid.component.scss']
})
export class GenericGridComponent<TData> implements OnInit {
  private _items: TData[] = [];
  private _columns: DataColumn<TData>[] = [];

  private _dataSource!: DataSource;
  private _dataGridColumns: DataGridColumn[] = [];

  private _nativeElement: HTMLElement;

  @ViewChild(DxDataGridComponent, { static: true })
  public dataGrid!: DxDataGridComponent;

  @Input()
  public keyExpr!: keyof TData;

  @Input()
  public showFilterRow = true;

  @Input()
  public showQuickSearch = true;

  @Input()
  public showHeaderFilter = true;

  @Input()
  public currentFilter = '';

  @Input()
  public set columns(value: DataColumn<TData>[]) {
    this._columns = value;
    this._updateDataGridColumns(this._columns);
  }

  @Input()
  public set items(value: TData[]) {
    this._items = value;
    this._refreshDataSource(this._items);
  }
  public get items() {
    return [...this._items];
  }

  @Output()
  public rowClicked = new EventEmitter<TData>();

  public get isReady() {
    return this.dataGridColumns.length !== 0;
  }

  public get dataGridColumns() {
    return this._dataGridColumns;
  }

  public get dataSource() {
    return this._dataSource;
  }

  constructor(private element: ElementRef) {
    this._nativeElement = element.nativeElement;
  }

  async ngOnInit() {
    await this._refreshDataSource(this._items);

    setTimeout(() => {
      console.log(this._nativeElement);
      this._emit('element-ready', this);
    });
  }

  public onRowClicked(dataRow: { data: TData }) {
    this.rowClicked.emit(dataRow.data);
    this._emit('row-clicked', dataRow.data);
  }

  private async _refreshDataSource(items: TData[]) {
    const store = new ArrayStore({
      key: this.keyExpr as string,
      data: items
    });

    this._dataSource = new DataSource({
      store
    });

    await this._refreshDataGrid();
  }

  private async _updateDataGridColumns(columns: DataColumn<TData>[]) {
    const dataGridColumns = columns.map(x => {
      return x as DataGridColumn;
    });

    this._dataGridColumns = dataGridColumns;

    await this._refreshDataGrid();
  }

  private async _refreshDataGrid() {
    return new Promise(resolve => {
      if (this.dataGrid && this.dataGrid.instance) {
        resolve(this.dataGrid.instance.refresh());
      }
      resolve();
    });
  }

  private _emit<TPayload>(name: string, payload: TPayload) {
    const event = new CustomEvent(name, { detail: payload });
    this._nativeElement.dispatchEvent(event);
    return event;
  }
}
