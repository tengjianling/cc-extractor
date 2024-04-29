from config import app

@app.route("/")
def home():
    return 'home page'

if __name__ == "__main__":
    app.run()