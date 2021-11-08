export class StateReformingServiceMock {
  stateHistory = [];

  saveNavStack(nav) {
    this.stateHistory = [];
    for(let i = 0; i < nav.length(); i++) {
      const view = nav.getByIndex(i);
      this.stateHistory.push({
        page: view.name,
        params: view.data
      });
    }
    const stateJSON = JSON.stringify(this.stateHistory);
  }
}
