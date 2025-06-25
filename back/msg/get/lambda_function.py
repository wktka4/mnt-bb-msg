import sys
import logging
import pymysql
import json
import os
import base64

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

sql_get_data = "" \
    "SELECT " \
    "    %s" \
    "  , pm.messagecategory" \
    "  , pm.messagecategory_jp" \
    "  , an.angle " \
    "  , bm.id" \
    "  , bm.message" \
    "  , bm.reading" \
    "  , bm.wav " \
    "FROM " \
    "  (SELECT * FROM (VALUES ROW('0'), ROW('1'), ROW('2'), ROW('3')) const_angle(`angle`)) an " \
    "CROSS JOIN tenji.preset_messagecategory pm  " \
    "LEFT OUTER JOIN tenji.blockmessage bm " \
    "   ON bm.angle = an.angle " \
    "  AND bm.messagecategory = pm.messagecategory " \
    "  AND (bm.code = %s " \
    "    OR bm.code IS NULL) " \
    "ORDER BY pm.messagecategory, an.angle " \
    ";" \



def handler(event, context):

    # ブロックコードを取得
    code = event["queryStringParameters"]["code"]

    # メッセージをカテゴリ、アングル網羅した値を取得
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute(sql_get_data, (code,code, ))
    datas = cur.fetchall()
    cur.close()

    res_body = {
        "datas": datas
    }

    return {
        "body": res_body
    }
