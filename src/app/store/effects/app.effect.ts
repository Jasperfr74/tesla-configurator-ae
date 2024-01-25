import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, mergeMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeslaService } from '../../shared/services/tesla.service';
import {
   ROUTER_NAVIGATION,
  RouterNavigationAction,
} from '@ngrx/router-store';
import * as AppActions from '../actions/app.action';
import { Tesla } from '../../core/models/tesla';

@Injectable()
export class AppEffect {
  loadModels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigationAction) =>
        r.payload.routerState.url.startsWith('/step-1')
      ),
      mergeMap(() =>
        this.teslaService.getModels()
          .pipe(
            map((payload: Tesla[]) =>
              AppActions.loadModelInformation({ payload })
            ),
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private teslaService: TeslaService,
  ) {}
}
