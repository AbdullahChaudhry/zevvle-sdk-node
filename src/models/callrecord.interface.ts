export interface ICallRecord {
  id: string 
  sim_card_id: string,
  setup_at: string,
  started_at: string,
  duration: number,
  charge: string,
  service_charge: string,
  imei: string|null,
  calling_number: string,
  dialled_number: string,
  redirected_number: string,
  number_type: string,
  simple_type: string,
  zevvle_type: string|null,
  mcc: string|null,
  mnc: string|null,
  origin: string,
  destination: string
}
