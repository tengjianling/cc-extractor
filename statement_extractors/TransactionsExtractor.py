from flask import jsonify
from io import BytesIO
from abc import ABC, abstractmethod

class TransactionsExtractor(ABC):
    @abstractmethod
    def get_dataframe(self):
        pass    

    def get_statement_json(self, transactions_df, bank):
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