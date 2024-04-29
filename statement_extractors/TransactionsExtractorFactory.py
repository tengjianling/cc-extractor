from .UOBTransactionsExtractor import UOBTransactionsExtractor
from .HSBCTransactionsExtractor import HSBCTransactionsExtractor


class TransactionsExtractorFactory:
    @staticmethod
    def create_transactions_extractor(bank):
        match bank:
            case 'UOB':
                return UOBTransactionsExtractor()
            case 'HSBC':
                return HSBCTransactionsExtractor()
            case _:
                raise ValueError("Unsupported bank")