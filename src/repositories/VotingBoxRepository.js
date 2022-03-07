import config from '../config';

export class VotingBoxRepository {
  getVotingBoxes(location, distance = 1000) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams({
        lat: location.latitude,
        lng: location.longitude,
        distance,
      });
      fetch(config.serverUrl + `/voting-boxes/closer?${params.toString()}`)
        .then(resp => resp.json())
        .then(resolve)
        .catch(reject);
    });
  }

  searchBySection = form => {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams(form);
      fetch(config.serverUrl + `/voting-boxes/search?${params.toString()}`)
        .then(resp => resp.json())
        .then(resolve)
        .catch(reject);
    });
  };
}
