from statement_extractors.TransactionsExtractor import TransactionsExtractor
import pandas as pd

class UOBTransactionsExtractor(TransactionsExtractor):
    def get_dataframe(self, tables):
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
    