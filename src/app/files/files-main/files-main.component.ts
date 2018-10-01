import { Component, OnInit } from '@angular/core';

const defaults = {
  python:
    'print(\"hello world!\")',
};

@Component({
  selector: 'app-files-main',
  templateUrl: './files-main.component.html',
  styleUrls: ['./files-main.component.scss']
})
export class FilesMainComponent implements OnInit {
  readOnly = false;
  
  options: any = {
    lineNumbers: true,
    mode: 'python',
    theme: 'neo'
  };

  defaults = defaults;

  handleChange($event) {
    console.log('ngModelChange', $event);
  }

  ngOnInit() {
  }

}
