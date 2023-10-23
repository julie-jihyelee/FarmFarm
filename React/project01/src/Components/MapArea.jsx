import { Map, MapMarker, CustomOverlayMap, ZoomControl } from 'react-kakao-maps-sdk';
import '../Css/Map.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const MapArea = (data) => {

  console.log('받아온 값:',data);

  const farmList = data.list;
  console.log('이거머야',farmList)
 
	const locations = [];

  farmList.map((i)=> {
    locations.push({'title': i.farm_title, 'latlng': { 'lat': Number(i.lantitude), 'lng': Number(i.longitude) }, 'num': i.farm_num , 'data' : i});
    })
  console.log('위치',locations)

  const locaInfo = locations.map((l)=>
    <MapMarker
					key={`${l.title}-${l.latlng}`}
					position={l.latlng} onClick={()=>setLevel(5)}
					image={{
						src: 'img/mapPin.png',
            alt : 'marker',
						size: { width: 100, height: 120 }
					}}
					title={l.title}
				/>
        
  )

  const nav = useNavigate();
  const send = (title)=>{
    const data = farmList.filter((v)=>v.farm_title === title)[0]
    console.log('쪼갠값',data);
    nav('/find/farm', {state:{data}})
  }


  const initialCenter = locations.length > 0 ? locations[0].latlng : { lat: 35.156669, lng: 126.835521 };
  const [level, setLevel] = useState(5);
 
  return (
		<Map center={initialCenter} id ='map' level={5} onZoomChanged={(map) => setLevel(map.getLevel())}>
      {locaInfo}
      {locations.map((loc, idx) => (
        level < 6 ? (
        <CustomOverlayMap key={loc.num} position={loc.latlng} xAnchor={0.5} yAnchor={1.1} >
        <div className="customoverlay" onClick={()=>{send(loc.title)}}>
          <Link to={`/find/farm`} >
            <span className="title">{loc.title}</span>
          </Link>
        </div>
      </CustomOverlayMap> ) : null ))}
      
      <ZoomControl />
      
		</Map>
	);
};
export default MapArea