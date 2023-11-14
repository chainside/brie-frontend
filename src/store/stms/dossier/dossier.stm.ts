import { StrictEffect } from '@redux-saga/types';
import { StateMachine, } from 'redux-sigma';
import { StateMachineNames } from '../StateMachinesNames';
import { call, put } from "typed-redux-saga/macro";
import { getDossiersByFilter } from '../../../services/Dossier/DossierServices';
import { DossierInterface } from '../../../services/Dossier/api';
import { ChangeFilters, ChangeDossierListPage, ChangeSkipMaxFilters, DossierEvents, dossierSuccess, SortTable, dossierError } from './dossier.events';
import { FilterDossierList } from '../../../types/types';
import { genericError } from '../login/login.events';

interface Context {
  dossierList?: DossierInterface[],
  count: number,
  filters: FilterDossierList,
  page: number,
}



export enum DossierStates {
  loadList = "load_list",
  showList = "show_list",
  failure = "failure",

}

class DossierMachine extends StateMachine<
  DossierEvents,
  DossierStates,
  StateMachineNames,
  Context
> {
  initialState = DossierStates.loadList;

  name = StateMachineNames.paperwork;

  spec = {

    [DossierStates.loadList]: {
      onEntry: this.getDossiers,
      transitions: {
        [DossierEvents.failed]: DossierStates.failure,
        [DossierEvents.success]: DossierStates.showList
      },
    },
    [DossierStates.failure]: {
      transitions: {
        [DossierEvents.retryLoading]: DossierStates.loadList,
      },
    },
    [DossierStates.showList]: {
      reactions: {
        [DossierEvents.changeFilter]: this.filterDossier,
        [DossierEvents.changeSkipMax]: this.filterSkipMax,
        [DossierEvents.updatePage]: this.updatePage,
        [DossierEvents.changeSortTableFilters]: this.sortTable
      }
    }

  };


  *updatePage(event: ChangeDossierListPage): Generator<StrictEffect, void> {
    yield* this.setContext(ctx => {
      ctx.page = event.payload
    })
  }


  *getDossiers(): Generator<StrictEffect, void> {
    try {


      const res = yield* call(getDossiersByFilter, this.context.filters)

      if (res.data) {
        yield* put(dossierError())
      }
      else {
        yield* this.setContext(ctx => {
          ctx.dossierList = res.dossier
          ctx.count = res.count
        })

        yield* put(dossierSuccess())
      }
    }


    catch (e) {
      yield* put(dossierError())
    }
  }


  *filterDossier(event: ChangeFilters): Generator<StrictEffect, void> {

    switch (event.payload.name) {
      case DossierEvents.changeTimespan:
        yield* this.setContext(ctx => {
          ctx.filters.endCreationDate = event.payload.value !== "0" ? new Date(event.payload.value.split(" - ")[1]) : undefined
          ctx.filters.startCreationDate = event.payload.value !== "0" ? new Date(event.payload.value.split(" - ")[0]) : undefined
          ctx.filters.skip = 0
          ctx.filters.max = 20
          ctx.page = 0
        })
        break
      case DossierEvents.changePhase:

        yield* this.setContext(ctx => {

          ctx.filters.phase = event.payload.value !== "0" ? event.payload.value : undefined
          ctx.filters.skip = 0
          ctx.filters.max = 20
          ctx.page = 0
        })
        break
      case DossierEvents.changeCreatedBy:
        yield* this.setContext(ctx => {
          ctx.filters.creator = event.payload.value !== "0" ? event.payload.value : undefined
          ctx.filters.skip = 0
          ctx.filters.max = 20
          ctx.page = 0
        })
        break
    }

    try {
      const res = yield* call(getDossiersByFilter, this.context.filters)

      yield* this.setContext(ctx => {
        ctx.dossierList = res.dossier
        ctx.count = res.count
      })

    } catch (e) {
      yield* put(genericError())

    }
  }

  *filterSkipMax(event: ChangeSkipMaxFilters): Generator<StrictEffect, void> {

    yield* this.setContext(ctx => {
      ctx.filters.skip = event.payload.skip
      ctx.filters.max = event.payload.max
    })

    try {
      const res = yield* call(getDossiersByFilter, this.context.filters)
      yield* this.setContext(ctx => {
        ctx.dossierList = res.dossier
        ctx.count = res.count
      })
    } catch (e) {
      yield* put(genericError())

    }
  }

  *sortTable(event: SortTable): Generator<StrictEffect, void> {

    yield* this.setContext(ctx => {
      ctx.filters.orderBy!.column = event.payload.column
      ctx.filters.orderBy!.direction = event.payload.direction
    })

    try {
      const res = yield* call(getDossiersByFilter, this.context.filters)


      yield* this.setContext(ctx => {
        ctx.dossierList = res.dossier
        ctx.count = res.count
      })

    } catch (e) {
      yield* put(genericError())

    }
  }



}

export const dossierMachine = new DossierMachine();
