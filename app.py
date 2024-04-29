from flask import request, jsonify
from config import app
from utils import is_allowed_file, get_dataframe, get_statement_json, download_excel_from_dataframe
from io import BytesIO
import tempfile
import tabula
import requests
import pandas as pd
from statement_extractors.TransactionsExtractorFactory import TransactionsExtractorFactory

@app.route("/")
def home():
    return 'home page'

@app.route('/api/extract_table', methods=['POST'])
def extract_table():
    statement_file = request.files['statement_file']
    bank = request.form["bank"]
    
    extractor = TransactionsExtractorFactory.create_transactions_extractor(bank)

    if statement_file.filename == '':
        return jsonify({'success': False, 'message': 'No selected File'}), 200
    if statement_file and is_allowed_file(statement_file.filename):
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp:
            statement_file.save(tmp.name)
            tables = tabula.read_pdf(tmp.name, pages='all', stream=True)
            transaction_df = extractor.get_dataframe(tables)

            tmp.close()
            if transaction_df is None:
                return jsonify({'success': False, 'message': 'Invalid Statement PDF.'})
            return extractor.get_statement_json(transaction_df, bank)

    return jsonify({'success': False, 'message': 'Selected file extension is not allowed.'}), 200

@app.route('/api/upload_transactions_to_sheets', methods=['POST'])
def upload_transactions_to_sheets():
    google_sheets_api_url = ""
    data = request.get_json()

    try:
        response = requests.post(google_sheets_api_url, json=data)
        if response.status_code == 200:
            return jsonify({'success': True, 'message': 'Upload successful'}), 200
        else:
            return jsonify({'success': False, 'message': 'Failed to communicate with external API'}), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/download_transactions_sheet', methods=['POST'])
def download_transactions_sheet():
    data = request.get_json()
    
    # Convert JSON array to pandas DataFrame
    df = pd.DataFrame(data)

    return download_excel_from_dataframe(df)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)