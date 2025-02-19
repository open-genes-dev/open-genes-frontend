import { Component, AfterViewChecked, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewChecked {
  private readonly lang: string;

  constructor(
    private translate: TranslateService,
    @Inject(DOCUMENT) public document: Document
  ) {
    this.translate.addLangs(environment.languages);
    if (localStorage.getItem('lang')) {
      this.lang = localStorage.getItem('lang');
    } else if (
      navigator.language.substring(0, 2) === 'en' ||
      navigator.language.substring(0, 2) === 'ru'
    ) {
      this.lang = navigator.language.substring(0, 2);
    } else {
      this.lang = environment.languages[1];
    }
    this.translate.use(this.lang);
  }

  ngOnInit(): void {
    console.log(`version: ${environment.version} \nbuild: ${environment.build}`);
  }

  ngAfterViewChecked(): void {

    setTimeout(() => {
      // TODO: find a proper way to wait for the full DOM loading considering all modules
      this.document.body.classList.remove('body--loading');
    }, 500);
  }
}
