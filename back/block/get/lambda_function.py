import sys
import logging
import pymysql
import json
import os
import math

import pymysql.cursors

# rds settings
user_name = os.environ.get('USER_NAME')
password = os.environ.get('PASSWORD')
rds_proxy_host = os.environ.get('RDS_PROXY_HOST')
db_name = os.environ.get('DB_NAME')

logger = logging.getLogger()
logger.setLevel(logging.INFO)

# create the database connection outside of the handler to allow connections to be
# re-used by subsequent function invocations.
try:
    conn = pymysql.connect(host=rds_proxy_host, user=user_name,
                           passwd=password, db=db_name, connect_timeout=5)
except pymysql.MySQLError as e:
    logger.error(
        "ERROR: Unexpected error: Could not connect to MySQL instance.")
    logger.error(e)
    sys.exit(1)

logger.info("SUCCESS: Connection to RDS for MySQL instance succeeded")

sql_max_page = "SELECT CEILING(COUNT(1)/20) AS 'max_page' FROM blockdata"
sql_get_data = "SELECT * FROM blockdata ORDER BY code LIMIT %s, 20"

def handler(event, context):

    cur = conn.cursor(pymysql.cursors.DictCursor)

    # 最大件数を取得し、最大ページ数を作成
    cur.execute(sql_max_page)
    max_size = cur.fetchone()
    max_size["max_page"] = int(max_size["max_page"])

    # 20件ずつデータを取得する
    offset = (int(event["queryStringParameters"]["page_no"]) - 1) * 20
    cur.execute(sql_get_data, (offset,))

    datas = cur.fetchall()
    cur.close()

    res_body = {
        "datas": datas
    }
    res_body.update(max_size)

    return {
        "body": res_body
    }
