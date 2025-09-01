import { Subject } from 'rxjs';

const subject = new Subject();
const modalSubject = new Subject();
const navigationSubject = new Subject();
export const sharedService = {
  setModalOpen: (d) => modalSubject.next(d),
  getModalOpenData: () => modalSubject.asObservable(),
  clearModalData: () => subject.complete(),
  setNavOpen: (d) => navigationSubject.next(d),
  getnavOpenData: () => navigationSubject.asObservable(),
  clearNavData: () => subject.complete(),
};
