export type GasStationID = string & { _tag: 'GasStationID' };

export type GasStation = {
  id: GasStationID;
  name: string;
  city: string;
};
