import { Component } from '@angular/core';

import {GaleriaPage} from '../galeria/galeria'
import { LindasPage } from '../lindas/lindas';
import { FeasPage } from '../feas/feas';
import { HomePage } from '../home/home';

import { NavController,NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = LindasPage;
  tab3Root = FeasPage;
  tab4Root = GaleriaPage;

  constructor(public navParams: NavParams) {

  }
}
