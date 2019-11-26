import { Component, OnInit } from '@angular/core';
import { DataColumn } from './grids/data-column.model';

interface DummyItem {
  id: number;
  title: string;
  description?: string;
}

const data: DummyItem[] = [
  {
    id: 1,
    title: 'one',
    description: 'uno'
  },
  {
    id: 2,
    title: 'two',
    description: 'dos dos'
  },
  {
    id: 3,
    title: 'three',
    description: 'tres tres tres'
  }
];

const columns: DataColumn<DummyItem>[] = [
  {
    name: 'ID',
    dataField: 'id',
    dataType: 'number'
  },
  {
    name: 'Title',
    dataField: 'title',
    dataType: 'string'
  },
  {
    name: 'Descr.',
    dataField: 'description',
    dataType: 'string'
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  data = data;
  columns = columns;

  ngOnInit() {}
}
