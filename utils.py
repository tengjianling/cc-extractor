from flask import jsonify, send_file
import tabula
import pandas as pd
from io import BytesIO

ALLOWED_EXTENSIONS = {'pdf'}
def is_allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_dataframe(tables):
    if not tables: return None
    def process_dataframe(df):
        header = ['description_of_transaction', 'transaction_amount', 'post_date', 'transaction_date']
        df['post_date'] = df["LADY'S CARD"].str.slice(0, 6)
        df["LADY'S CARD"] = df["LADY'S CARD"].str.slice(7)
        df['transaction_date'] = df["LADY'S CARD"].str.slice(0, 6)
        df["LADY'S CARD"] = df["LADY'S CARD"].str.slice(7)
        df = df[3:]
        df.columns = header
        df = df.dropna(subset=['transaction_amount'])
        return df
    page1_df = tables[0]
    page1_df.columns = ["LADY'S CARD", "col1", "col2"]
    first_index = (page1_df['col2'] == 'Transaction Amount').idxmax()
    page1_df = tables[0][first_index:]
    del page1_df["col1"]
    res_df = process_dataframe(page1_df)
    for df in tables[1:-1]:
        res_df = pd.concat([res_df, process_dataframe(df)], ignore_index=True)
    return res_df[:-2]

def get_statement_json(transactions_df, bank):
    transactions = transactions_df.to_dict(orient="records")
    return jsonify(
        {
            "statement": {
                "transactions" : transactions,
                "bank": bank,
            },
            "message": "Transactions successfully extracted.",
            "success": True
        }
    )

def download_excel_from_dataframe(df):
    # Create a BytesIO buffer to hold the Excel file in memory
    output = BytesIO()
    with pd.ExcelWriter(output, engine='openpyxl') as writer:
        df.to_excel(writer, index=False)

    # Set the file's position to the beginning
    output.seek(0)

    # Send the Excel file as a response to be downloaded
    return send_file(
        output,
        mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        as_attachment=True,
        download_name='transactions.xlsx'
    )