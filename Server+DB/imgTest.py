import os
from datetime import datetime
from flask import Flask, request, jsonify
import cx_Oracle
from flask_cors import CORS

write_time = datetime.now().strftime('%Y-%m-%d')
cx_Oracle.init_oracle_client('instantclient_11_2')

app = Flask(__name__)
CORS(app)


# ==================== 자랑하기 글 추가 ==================== #
@app.route('/add_content', methods=['POST'])
def add_content():

    UPLOAD_FOLDER = './content_img'
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

    def save_image(file, content_num):
        filename = f"{content_num}_{file.filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        return filename
    
    user_id = request.form.get('user_id')
    content_title = request.form.get('content_title')
    contents = request.form.get('contents')
    image = request.files['content_img']

    if image:
        conn = cx_Oracle.connect('Insa4_APP_hacksim_3', 'aishcool3', 'project-db-stu3.smhrd.com:1524/xe')
        curs = conn.cursor()

        sql = (
            f"INSERT INTO content (content_num, content_title, user_id, contents, content_img, write_time) "
            f"VALUES (content_seq.NEXTVAL, '{content_title}', '{user_id}', '{contents}', NULL, '{write_time}')"
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
        print(update_sql)
        conn.commit()

        curs.close()
        conn.close()

        response = {'message': 'Content added successfully'}
        return jsonify(response), 200
    else:
        response = {'error': 'Image not found'}
        return jsonify(response), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5022)
