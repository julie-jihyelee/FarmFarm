import requests
import sys

def address(location):
    CLIENT_ID = "c4d53272b98cf385ceda7e981fe924be"
    url = "https://dapi.kakao.com/v2/local/search/address.json"
    params={"query": location}
    
    headers = {"Host": "dapi.kakao.com", "Authorization": f"KakaoAK {CLIENT_ID}"}
    
    response = requests.get(url, params, headers = headers)
    
    # json.dumps(params)를 하면 400 에러가 뜬다! Why?!
    data = response.json()["documents"][0]
    lat, lnt = data["x"], data["y"]
    zip_code = data["road_address"]["zone_no"]
    return lat, lnt, zip_code

if __name__ == "__main__":
    address(sys.argv[1])