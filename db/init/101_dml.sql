USE tenji;
INSERT INTO
  preset_blockcategory (category, category_jp)
VALUES
    ('establishment', '施設')
  , ('landmark', 'ランドマーク')
  , ('museum', '博物館')
  , ('road', '道路')
  , ('shelter', '避難所')
  , ('shrine', '神社')
  , ('temple', '寺院')
  , ('tourist_spot', '観光地')
  , ('water_closet', 'トイレ')
;

INSERT INTO
  preset_messagecategory (messagecategory, messagecategory_jp)
VALUES
    ('detail', '詳細')
  , ('evacuation', '避難')
  , ('exclusive', '専用')
  , ('normal', '一般')
;

INSERT INTO 
  blockdata (code, category, latitude, longitude, install, buildingfloor, `name`) 
VALUES
  ('1', 'landmark', '34.669173242849695', '133.9520287513733', '0', '1', '点字ブロック発祥の地')
 ,('2', 'landmark', '34.6692', '133.952069', '0', '1', '点字ブロック発祥の地東側')
 ,('17', 'landmark', '35.594694', '139.671904', '0', '1', 'クッキーのメッセージ')
 ,('23', 'establishment', '35.594694', '139.671904', '0', '1', 'クッキーのメッセージ')
 ,('129', 'establishment', '36.529501524411536', '136.62869655732015', '5', '1', '南校地工大前交差点')
 ,('130', 'establishment', '36.52940182195656', '136.62863622708937', '3', '1', '南校地警備室前')
 ,('131', 'establishment', '36.52927950897523', '136.6286026994767', '3', '1', '南校地警備室横')
 ,('132', 'establishment', '36.52926236091003', '136.62815699769158', '0', '1', '金沢工業大学11号館')
 ,('133', 'establishment', '36.52883826779317', '136.6285925227587', '3', '1', '金沢工業大学 南校地10号館下')
 ,('134', 'establishment', '36.528812388221404', '136.62824103482671', '3', '1', '金沢工業大学 12号館前')
 ,('136', 'establishment', '36.5280438799666', '136.6285937952274', '6', '1', '金沢工業大学 体育館横')
 ,('137', 'establishment', '36.528054520468345', '136.62825527361508', '3', '1', '金沢工業大学 20号館前')
;
