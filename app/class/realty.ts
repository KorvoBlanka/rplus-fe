export class Realty {
  id: String;

  state_code : String;
  state_change_date: Number;

  stage : String;
  stage_change_date: Number;

  type_code: String;
  offer_type_code: String;

  address: String;
  //house_num ap_num
  house_type: String;

  ap_scheme: String;         // планировка
  rooms_count: Number;
  rooms_offer_count: Number;
  room_scheme: Number;

  floor: Number;
  floors_count: Number;
  levels_count: Number;
  condition: String;
  balcony: String;
  bathroom: String;

  square_total: Number;
  square_living: Number;
  square_kitchen: Number;
  square_land: Number;

  description: Number;
  source_media: Number;
  source_url: Number;
  source_media_text: Number;

  creator_id: Number;
  add_date: Number;
  change_date: Number;
  delete_date: Number;
  last_seen_date: Number;



  owner_price: Number;
  agency_price: Number;
  lease_deposite: Number;
  price_change_date: Number;
  work_info: String;

  //latitude
  //longitude

  landmark: String;

  owner_id: String;
  agent_id: String;
  assign_date: Number;

  multylisting: Boolean;
  mls_price_type: String;
  mls_price: Number;

  main_photo_thumbnail: String;
  location: any;

  selected: boolean = false;

  public static normalize_(realty: Realty) {
    console.log('normalize');
    for (var f in realty) {
      if (realty[f] == "") {
        realty[f] = null;
      }
    }
  }

  public static getDigest (r: Realty) {
    var digest = [];

    digest.push('<strong>' + r.type_code + '</strong>');
    if (r.rooms_count) digest.push(r.rooms_count + 'к');
    if (r.floor && r.floors_count) { digest.push(r.floor + '/' + r.floors_count + ' эт.') } else if (r.floor || r.floors_count) { digest.push((r.floor || r.floors_count) + ' эт.'); }
    {
      var squares = [];
      if (r.square_total) squares.push(r.square_total);
      if (r.square_living) squares.push(r.square_living);
      if (r.square_kitchen) squares.push(r.square_kitchen);
      if (squares.length) digest.push(squares.join('/') + ' кв. м.');
    }
    digest.push('<br>');
    if (r.ap_scheme) digest.push(r.ap_scheme);
    if (r.house_type) digest.push(r.house_type);
    if (r.room_scheme) digest.push(r.room_scheme);
    if (r.condition) digest.push(r.condition);
    if (r.balcony) digest.push(r.balcony);
    if (r.bathroom) digest.push(r.bathroom);
    if (r.square_land) digest.push(r.square_land + ' га');
    if (r.description) {
      digest.push(r.description);
    }
    digest.push('<br>');
    if (r.owner_price) digest.push('<span class="text-primary">' + r.owner_price + ' тыс. руб.' + '</span>');

    return digest.join(' ');
  }
}
