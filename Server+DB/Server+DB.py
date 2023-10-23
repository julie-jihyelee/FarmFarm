import cx_Oracle, os, requests, json
from datetime import datetime
from flask import Flask, render_template, request, Response, jsonify
from flask import Flask, send_from_directory
from functools import wraps
from flask_cors import CORS

today = datetime.now().strftime('%Y-%m-%d')

cx_Oracle.init_oracle_client('instantclient_11_2')

app = Flask(__name__)
CORS(app)


# 한글깨짐 방지
def as_json(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        res = f(*args, **kwargs)
        res = json.dumps(res, ensure_ascii=False).encode('utf8')
        return Response(res, content_type='application/json; charset=utf-8')
    return decorated_function


# 주소에서 위경도 받아오기
def get_lat_lng(location):
    CLIENT_ID = "c4d53272b98cf385ceda7e981fe924be"
    url = "https://dapi.kakao.com/v2/local/search/address.json"
    params = {"query": location}
    headers = {"Host": "dapi.kakao.com", "Authorization": f"KakaoAK {CLIENT_ID}"}
    
    response = requests.get(url, params=params, headers=headers)
    data = response.json().get("documents")
    
    if data:
        lat = data[0]["y"]
        lng = data[0]["x"]
        return lat, lng
    else:
        return None, None


# 이미지 파일이 저장된 디렉토리의 경로 설정
CONTENT_UPLOAD_FOLDER = './content_img'
FARM_UPLOAD_FOLDER = './farm_img'
app.config['CONTENT_UPLOAD_FOLDER'] = CONTENT_UPLOAD_FOLDER
app.config['FARM_UPLOAD_FOLDER'] = FARM_UPLOAD_FOLDER

# 이미지 파일 제공을 위한 라우트 설정
@app.route('/content_img/<filename>')
def serve_content_image(filename):
    return send_from_directory(app.config['CONTENT_UPLOAD_FOLDER'], filename)

@app.route('/farm_img/<filename>')
def serve_farm_image(filename):
    return send_from_directory(app.config['FARM_UPLOAD_FOLDER'], filename)


# ==================== 로그인 ==================== #
@app.route('/login', methods=['POST'])
@as_json
def login():
    print('# ==================== 로그인 ==================== #')
    data2 = request.json
    data = data2.get('form', {})
    user_id = data.get('user_id', 'Unknown')
    user_password = data.get('user_password', 'Unknown')
    print('받은데이터:', data)

    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()

    sql = f"select user_id, user_nick, user_type from member where user_id = '{user_id}' and user_password = '{user_password}'"
    curs.execute(sql)
    res = curs.fetchall()
    print('sql응답', res)

    resList = []

    if not res:
        result = False
    else:
        for a in res:
            resList.append({"user_id":a[0], "user_nick":a[1], "user_type":a[2]})
        result = resList

    curs.close()
    conn.close()
    print('응답메시지: ', result)

    return result


# ==================== 회원가입 아이디 중복 체크 ==================== #
@app.route('/id_check', methods=['POST'])
@as_json
def id_check():
    print('# ==================== 회원가입 아이디 중복 체크 ==================== #')
    data = request.json
    user_id = data.get('user_id', 'Unknown')
    print('받은데이터:', data)

    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()

    sql = f"select * from member where user_id = '{user_id}'"

    curs.execute(sql)
    res = curs.fetchall()
    print('sql응답', res)

    if not res:
        result = False
    else:
        result = True

    curs.close()
    conn.close()
    print('응답메시지: ', result)

    return result


# ==================== 회원가입 닉네임 중복 체크 ==================== #
@app.route('/nick_check', methods=['POST'])
@as_json
def nick_check():
    print('# ==================== 회원가입 닉네임 중복 체크 ==================== #')
    data = request.json
    user_nick = data.get('user_nick', 'Unknown')
    print('받은데이터:', data)

    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()

    sql = f"select * from member where user_nick = '{user_nick}'"

    curs.execute(sql)
    res = curs.fetchall()
    print('sql응답', res)

    if not res:
        result = False
    else:
        result = True

    curs.close()
    conn.close()
    print('응답메시지: ', result)

    return result


# ==================== 회원가입 이메일 중복 체크 ==================== #
@app.route('/email_check', methods=['POST'])
@as_json
def email_check():
    print('# ==================== 회원가입 이메일 중복 체크 ==================== #')
    data = request.json
    user_email = data.get('user_email', 'Unknown')
    print('받은데이터:', data)

    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()

    sql = f"select * from member where user_email = '{user_email}'"

    curs.execute(sql)
    res = curs.fetchall()
    print('sql응답', res)

    if not res:
        result = False
    else:
        result = True

    curs.close()
    conn.close()
    print('응답메시지: ', result)


    return result


# ==================== 회원 가입 데이터 넣기 ==================== #
@app.route('/add_id', methods=['POST'])
def add_id():
    print('# ==================== 회원 가입 데이터 넣기 ==================== #')
    data = request.json
    user_data = data.get('form', {})
    user_id = user_data.get('user_id', 'Unknown')
    user_password = user_data.get('user_password', 'Unknown')
    user_name = user_data.get('user_name', 'Unknown')
    user_nick = user_data.get('user_nick', 'Unknown')
    user_email = user_data.get('user_email', 'Unknown')
    user_phone = user_data.get('user_phone', 'Unknown')
    user_address = user_data.get('user_address', 'Unknown')

    print('받은데이터:', user_data)

    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()

    sql = (
            f"INSERT INTO member (user_id, user_password, user_name, user_nick, user_email, user_phone, user_address, user_type)"
            f"VALUES ('{user_id}', '{user_password}', '{user_name}', '{user_nick}', '{user_email}', '{user_phone}', '{user_address}', 0)"
        )
    curs.execute(sql)

    print('sql문', sql)
    conn.commit()

    curs.close()
    conn.close()

    response = 'success'
    print(response)
    return response


# ==================== 텃밭 등록 ==================== #
@app.route('/add_farm', methods=['POST'])
@as_json
def add_farm():
    print('# ==================== 텃밭 등록 ==================== #')
    FARM_UPLOAD_FOLDER = './farm_img'
    app.config['FARM_UPLOAD_FOLDER'] = FARM_UPLOAD_FOLDER

    def save_image(file, farm_num):
        original_extension = file.filename.rsplit('.', 1)[-1].lower()
        filename = f"{farm_num}.{original_extension}"
        filepath = os.path.join(app.config['FARM_UPLOAD_FOLDER'], filename)
        file.save(filepath)
        return filename
     
    farm_title = request.form.get('farm_title')
    farm_type = request.form.get('farm_type')
    farm_address = request.form.get('farm_address')
    farm_price = request.form.get('farm_price')
    user_id	= request.form.get('user_id')
    lental_area	= request.form.get('lental_area')
    farm_sector	= request.form.get('farm_sector')
    lental_type	= request.form.get('lental_type')
    startDate	= request.form.get('startDate')
    endDate	= request.form.get('endDate')
    lental_startDate = request.form.get('lental_startDate')
    lental_endDate = request.form.get('lental_endDate')
    description = request.form.get('description')
    image = request.files.get('farm_img')
    print('날짜',startDate)

    lantitude, longitude = get_lat_lng(farm_address)

    if image:
        conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
        curs = conn.cursor()

        sql = (
            f"INSERT INTO farm (farm_num, farm_title, farm_type, farm_address, farm_price, lantitude, longitude, user_id, lental_area, farm_sector, lental_type, startDate, endDate, lental_startDate, lental_endDate, description, farm_img, farm_day)"
            f"VALUES (farm_seq.NEXTVAL, '{farm_title}', '{farm_type}', '{farm_address}', '{farm_price}', '{lantitude}', '{longitude}', '{user_id}', '{lental_area}', '{farm_sector}', '{lental_type}', '{startDate}', '{endDate}', '{lental_startDate}', '{lental_endDate}', '{description}', NULL, '{today}')"
        )
        print(sql)
        curs.execute(sql)
        conn.commit()

        curs.execute("SELECT farm_seq.currval FROM DUAL")
        farm_num = curs.fetchone()[0]

        saved_filename = save_image(image, farm_num)

        update_sql = (
            f"UPDATE farm SET farm_img = '{saved_filename}' WHERE farm_num = {farm_num}"
        )
        curs.execute(update_sql)
        conn.commit()

        sql2 = f"update member set user_type = 1 where user_id = '{user_id}'"
        curs.execute(sql2)
        conn.commit()

        curs.close()
        conn.close()

        result = True
        print(result)
        return result
    else:
        result = 'error'
        print(result)
        return result


# ==================== 텃밭 검색 ==================== #
@app.route('/farm', methods=['GET'])
@as_json
def farm():
    print('# ==================== 텃밭 검색 ==================== #')
    sido = request.args.get('sido', 'Unknown')
    sigungu = request.args.get('sigungu', 'Unknown')
    
    print('받은데이터: ', sido, sigungu)

    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()

    if sido == 'Unknown' or sigungu == 'Unknown':
        sql = "SELECT farm_num, farm_title, farm_type, farm_address, farm_price, lantitude, longitude, farm.user_id, lental_area, farm_sector, lental_type, startDate, endDate, lental_startDate, lental_endDate, description, farm_img, farm_day, user_name, user_nick, user_email, user_phone FROM farm INNER JOIN member ON farm.user_id = member.user_id WHERE farm_address LIKE '%광주%' AND farm_address LIKE '%광산구%'"

    else:
        sql = f"select farm_num, farm_title, farm_type, farm_address, farm_price, lantitude, longitude, farm.user_id, lental_area, farm_sector, lental_type, startDate, endDate, lental_startDate, lental_endDate, description, farm_img, farm_day, user_name, user_nick, user_email, user_phone from farm INNER JOIN member ON farm.user_id = member.user_id where farm_address like '%{sido}%' and farm_address like '%{sigungu}%'"
    curs.execute(sql)
    res = curs.fetchall()
    print('db에서 나온 데이터', res)

    curs.close()
    conn.close()


    resList = []

    for a in res:
        resList.append({"farm_num":a[0], 
                        "farm_title":a[1], 
                        "farm_type":a[2], 
                        "farm_address": a[3], 
                        "farm_price":a[4], 
                        "lantitude":a[5], 
                        "longitude":a[6], 
                        "user_id":a[7], 
                        "lental_area":a[8], 
                        "farm_sector":a[9], 
                        "lental_type":a[10], 
                        "startDate":a[11], 
                        "endDate":a[12], 
                        "lental_startDate":a[13], 
                        "lental_endDate":a[14],
                        "description":a[15],
                        "farm_img":a[16],
                        "farm_day":a[17],
                        "user_name":a[18],
                        "user_nick":a[19],
                        "user_email":a[20],
                        "user_phone":a[21]
                        })
    print('보낸데이터', resList)
    return resList


# ==================== 텃밭 신청 체크 ==================== #
@app.route('/farm_check', methods=['GET'])
@as_json
def farm_check():
    print('# ==================== 텃밭 신청 체크 ==================== #')
    user_id = request.args.get('user_id', 'Unknown')
    farm_num = request.args.get('farm_num', 'Unknown')
    print('받은데이터', user_id, farm_num)

    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()
    
    sql = f"SELECT * FROM FARMAPPLICATION WHERE user_id = '{user_id}' and farm_num = '{farm_num}'"
    
    curs.execute(sql)
    res = curs.fetchall()
    print('sql응답', res)

    if not res:
        result = False
    else:
        result = True

    curs.close()
    conn.close()
    print('응답메시지: ', result)

    return result


# ==================== 텃밭 신청하기 ==================== #
@app.route('/farm_apply', methods=['GET'])
def farm_apply():
    print('# ==================== 텃밭 신청하기 ==================== #')
    user_id = request.args.get('user_id', 'Unknown')
    farm_num = request.args.get('farm_num', 'Unknown')
    print('받은데이터', user_id, farm_num)

    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()

    # farm_sector 값 가져오기
    farm_sector_sql = f"SELECT farm_sector FROM farm WHERE farm_num = '{farm_num}'"
    curs.execute(farm_sector_sql)
    farm_sector_result = curs.fetchone()

    if farm_sector_result:
        farm_sector = farm_sector_result[0]

        # 이미 신청된 분양 수 확인
        applied_count_sql = f"SELECT COUNT(*) FROM FARMAPPLICATION WHERE farm_num = '{farm_num}'"
        curs.execute(applied_count_sql)
        applied_count_result = curs.fetchone()

        if applied_count_result:
            applied_count = applied_count_result[0]

            # farm_sector 값보다 신청된 분양 수가 작을 경우에만 신청 가능
            if applied_count < farm_sector:
                sql = (
                    f"INSERT INTO FARMAPPLICATION (APPLICATION_NUM, USER_ID, FARM_NUM, APPLY_DAY)"
                    f"VALUES (farmApplication_seq.NEXTVAL, '{user_id}', '{farm_num}', '{today}')"
                )
                print('sql문', sql)

                curs.execute(sql)
                conn.commit()
                curs.close()
                conn.close()
                response = {'message': 'success'}
                print('보낸데이터', response)
                return jsonify(response)
            else:
                response = {'message': '이미 해당 농장의 분양 신청이 최대치입니다'}
                print('보낸데이터', response)
                return jsonify(response)
        else:
            response = {'message': '분양 신청 수를 가져올 수 없습니다'}
            print('보낸데이터', response)
            return jsonify(response)
    else:
        response = {'message' : '농장 섹터 값을 가져올 수 없습니다'}
        print('보낸데이터', response)
        return jsonify(response)


# ==================== 자랑하기 글 추가 ==================== #
@app.route('/add_content', methods=['POST'])
def add_content():
    print('# ==================== 자랑하기 글 추가 ==================== #')

    CONTENT_UPLOAD_FOLDER = './content_img'
    app.config['CONTENT_UPLOAD_FOLDER'] = CONTENT_UPLOAD_FOLDER

    def save_image(file, content_num):
        # 원래 파일의 확장자를 가져와서 사용
        original_extension = file.filename.rsplit('.', 1)[-1].lower()
        filename = f"{content_num}.{original_extension}"
        filepath = os.path.join(app.config['CONTENT_UPLOAD_FOLDER'], filename)
        file.save(filepath)
        return filename
    
    user_nick = request.form.get('user_nick')
    content_title = request.form.get('content_title')
    contents = request.form.get('contents')
    image = request.files['content_img']

    print('받은데이터', request.form)

    if image:
        conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
        curs = conn.cursor()

        sql = (
            f"INSERT INTO content (content_num, content_title, user_nick, contents, content_img, content_day) "
            f"VALUES (content_seq.NEXTVAL, '{content_title}', '{user_nick}', '{contents}', NULL, '{today}')"
        )
        curs.execute(sql)
        conn.commit()

        curs.execute("SELECT content_seq.currval FROM DUAL")
        content_num = curs.fetchone()[0]

        saved_filename = save_image(image, content_num)

        update_sql = (
            f"UPDATE content SET content_img = '{saved_filename}' WHERE content_num = {content_num}"
        )
        curs.execute(update_sql)
        print('sql문', update_sql)
        conn.commit()

        curs.close()
        conn.close()

        response = {'message': 'Content added successfully'}
        return jsonify(response), 200
    else:
        response = {'error': 'Image not found'}
        return jsonify(response), 400


# ==================== 자랑하기 게시판 ==================== #
@app.route('/content', methods=['GET', 'POST'])
@as_json
def content():
    print('# ==================== 자랑하기 게시판 ==================== #')
    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()
    sql = "SELECT * FROM content ORDER BY content_num DESC"
    curs.execute(sql)
    res = curs.fetchall()
    print('sql응답 :', res)
    curs.close()
    conn.close()
    resList = []
    for a in res:
        resList.append({"content_num":a[0],
                        "content_title":a[1], 
                        "user_nick":a[2],
                        "contents":a[3], 
                        "content_img": a[4], 
                        "content_day":a[5]
                        })
    return resList


# ==================== 작물 가격예측 ==================== #
@app.route('/price', methods=['GET', 'POST'])
@as_json
def price():
    print('# ==================== 작물 가격예측 ==================== #')
    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()
    sql = "SELECT * FROM price"
    curs.execute(sql)
    res = curs.fetchall()
    print('sql응답 :', res)
    curs.close()
    conn.close()
    resList = []
    for a in res:
        resList.append({"name":a[0],
                        "now":a[1], 
                        "pre":a[2],
                        'img':a[3]
                        })
    print('보낸데이터', resList)
    return resList

# ==================== 댓글 달기 ==================== #
@app.route('/content_comment', methods=['GET'])
def content_comment():
    print('# ==================== 댓글 달기 ==================== #')
    user_nick = request.args.get('user_nick', 'Unknown')
    content_num = request.args.get('content_num', 'Unknown')
    content_comment = request.args.get('content_comment', 'Unknown')
    print('받은데이터', user_nick, content_num, content_comment)

    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()
    
    if content_comment == "":
        sql2 = f"select * from content_comment where content_num = '{content_num}' ORDER BY content_comment_num DESC"
        curs.execute(sql2)
        res = curs.fetchall()
        curs.close()
        conn.close()
        resList = []
        for a in res:
            resList.append({"content_comment_num":a[0],
                            "user_nick":a[1], 
                            "content_num":a[2],
                            "content_comment":a[3], 
                            "content_comment_day": a[4]
                            })
        print('보낸데이터', resList)
        return resList
    else:
        sql = (
            f"INSERT INTO content_comment (content_comment_num, user_nick, content_num, content_comment, content_comment_day)"
            f"VALUES (content_comment_seq.NEXTVAL, '{user_nick}', '{content_num}', '{content_comment}', '{today}')"
        )

        curs.execute(sql)
        sql2 = f"select * from content_comment where content_num = '{content_num}' ORDER BY content_num DESC"
        curs.execute(sql2)
        res = curs.fetchall()
        curs.close()
        conn.commit()
        conn.close()
        resList = []
        for a in res:
            resList.append({"content_comment_num":a[0],
                            "user_nick":a[1], 
                            "content_num":a[2],
                            "content_comment":a[3], 
                            "content_comment_day": a[4]
                            })
        print('보낸데이터', resList)
        return resList


# ==================== 마이페이지 - 신청내역 ==================== #
@app.route('/myList', methods=['GET'])
def myList():
    print('# ==================== 마이페이지 - 신청내역 ==================== #')
    user_id = request.args.get('user_id', 'Unknown')
    print('받은데이터', user_id, )

    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()
    
    
    sql = f"SELECT FARMAPPLICATION.application_num, farm.farm_title, farm.farm_price, farm.lental_area, farm.lental_startDate, farm.lental_endDate, FARMAPPLICATION.apply_day FROM FARMAPPLICATION JOIN farm ON FARMAPPLICATION.farm_num = farm.farm_num WHERE FARMAPPLICATION.user_id = '{user_id}' order by FARMAPPLICATION.application_num desc"

    curs.execute(sql)
    res = curs.fetchall()
    curs.close()
    conn.close()
    resList = []
    for a in res:
        resList.append({"application_num":a[0],
                        "farm_title":a[1], 
                        "farm_price":a[2],
                        "lental_area":a[3],
                        "lental_startDate":a[4],
                        "lental_endDate":a[5],
                        "apply_day":a[6]
                        })
    print('보낸데이터', resList)
    return resList


# ==================== 마이페이지 - 신청자 ==================== #
@app.route('/myList2', methods=['GET'])
def myList2():
    print('# ==================== 마이페이지 - 신청자 ==================== #')
    user_id = request.args.get('user_id', 'Unknown')
    print('받은데이터', user_id, )

    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()
    
    sql = f"SELECT FARMAPPLICATION.application_num, FARMAPPLICATION.user_id, farm.farm_title, farm.lental_startDate, farm.lental_endDate, FARMAPPLICATION.apply_day FROM farm JOIN FARMAPPLICATION ON farm.farm_num = FARMAPPLICATION.farm_num WHERE farm.user_id = '{user_id}' order by FARMAPPLICATION.application_num desc"

    curs.execute(sql)
    res = curs.fetchall()
    curs.close()
    conn.close()
    resList = []
    for a in res:
        resList.append({"application_num":a[0],
                        "user_id":a[1], 
                        "farm_title":a[2],
                        "lental_startDate":a[3],
                        "lental_endDate":a[4],
                        "apply_day":a[5]
                        })
    print('보낸데이터', resList)
    return resList


# ==================== 내 정보 수정 접속 ==================== #
@app.route('/change', methods=['POST'])
def change():
    print('# ==================== 내 정보 수정 접속 ==================== #')
    data = request.json
    user_id = data.get('user_id', 'Unknown')
    print('받은데이터', user_id)
    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()
    
    sql = f"SELECT * FROM member WHERE user_id = '{user_id}'"

    curs.execute(sql)
    res = curs.fetchall()
    curs.close()
    conn.close()
    resList = []
    for a in res:
        resList.append({"USER_ID":a[0],
                        "USER_PASSWORD":a[1], 
                        "USER_NAME":a[2],
                        "USER_NICK":a[3],
                        "USER_EMAIL":a[4],
                        "USER_PHONE":a[5],
                        "USER_ADDRESS":a[6],
                        "USER_TYPE":a[7]
                        })
    print('보낸데이터', resList)
    return resList


# ==================== 내 정보 수정 하기 ==================== #
@app.route('/update_change', methods=['POST'])
def update_change():
    print('# ==================== 내 정보 수정 하기 ==================== #')
    data = request.json
    user_data = data.get('form', {})
    user_id = user_data.get('user_id', 'Unknown')
    user_password = user_data.get('user_password', 'Unknown')
    user_name = user_data.get('user_name', 'Unknown')
    user_nick = user_data.get('user_nick', 'Unknown')
    user_email = user_data.get('user_email', 'Unknown')
    user_phone = user_data.get('user_phone', 'Unknown')
    user_address = user_data.get('user_address', 'Unknown')

    print('받은데이터:', user_data)

    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()

    sql = f"UPDATE member set user_password = '{user_password}', user_nick = '{user_nick}', user_email = '{user_email}', user_phone = '{user_phone}', user_address = '{user_address}' where user_id = '{user_id}'"

    curs.execute(sql)

    print('sql문', sql)
    conn.commit()

    curs.close()
    conn.close()

    response = 'success'
    print(response)
    return response

# ==================== 삭제 페이지 ==================== #
@app.route('/delete', methods=['GET'])
def delete():
    print('# ==================== 삭제 페이지 ==================== #')
    content_num = request.args.get('content_num', 'Unknown')
    content_comment_num = request.args.get('content_comment_num', 'Unknown')
    application_num = request.args.get('application_num', 'Unknown')
    
    print('받은데이터', content_num, content_comment_num, application_num)

    conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
    curs = conn.cursor()
    if content_num != 'Unknown':
        print('자랑하기 글 삭제')
        # 파일 이름 가져오기
        curs.execute(f"SELECT content_img FROM content WHERE content_num = '{content_num}'")
        img_filename = curs.fetchone()[0]

        # 파일 삭제
        if img_filename:
            img_path = os.path.join(app.config['CONTENT_UPLOAD_FOLDER'], img_filename)
            if os.path.exists(img_path):
                os.remove(img_path)
        print('파일삭제 완료')

        # 댓글 삭제
        sql = f"delete from content_comment where content_num = '{content_num}'"
        curs.execute(sql)
        conn.commit()
        print('댓글삭제 완료')
        
        # 글 삭제
        sql = f"delete from content where content_num = '{content_num}'"
        curs.execute(sql)
        conn.commit()
        print('글삭제 완료')

        response = {'message': 'success'}
        print('보낸 메시지', response)
        return response
        
    elif content_comment_num != 'Unknown':
        print('자랑하기 댓글 삭제')
        sql = f"delete from content_comment where content_comment_num = {content_comment_num}"
        print('sql문',sql)
        curs.execute(sql)
        sql2 = "select * from content_comment"
        curs.execute(sql2)
        res = curs.fetchall()
        curs.close()
        conn.close()
        resList = []
        for a in res:
            resList.append({"content_comment_num":a[0],
                            "user_nick":a[1], 
                            "content_num":a[2],
                            "content_comment":a[3], 
                            "content_comment_day": a[4]
                            })
        print('보낸데이터', resList)
        return resList

    elif application_num != 'Unknown':
        print('신청내역 삭제')
        sql = f"delete from FARMAPPLICATION where APPLICATION_NUM = '{application_num}'"
        curs.execute(sql)
        conn.commit()
        print('신청내역 삭제 완료')
        

        response = {'message': 'success'}
        print('보낸 메시지', response)
        return response


  
    
if __name__ == '__main__':
    # app.run(debug=True)

    app.run(host='0.0.0.0', port=5022)