from telegram import InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (
    Updater,
    CommandHandler,
    CommandHandler,
)
import requests


# Default settings
TOKEN = "1258190398:AAGgTvhPLkPn8kKRWIbAiAOr4zruruVKlmw"
# JSON Methods
def Start(update, context):
    update.message.reply_text("Usare /get seguito da un nome di un film")


def GetData(update, context):
    try:
        print(
            "GetData ricevuto " + update.message.text.replace("/get", "").replace(" ", "")
        )
        titles = []
        webs = []

        if update.message.text.replace("/get", "").replace(" ", "") == "":
            update.message.reply_text("Inserire l'articolo da cercare dopo /get")
            return

        json = requests.get(
            "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=75pYOGoAe57CklyVGpG9FjiMBSGdgoDl&q={}".format(
                update.message.text.replace("/get", "")
            )
        ).json()

        for data in json["response"]["docs"]:
            titles.append(data["abstract"])
            webs.append(data["web_url"])

        print("Data getted from internet")
        if len(titles) == 0:
            update.message.reply_text("Non è stato trovato alcun articolo")
            return
        for i in range(len(titles)):
            #if titles[i].format(update.message.text.replace("/get", ""), "") != titles[i]:
            update.message.reply_text(titles[i] + "\nurl: " + webs[i])
        update.message.reply_text("La ricerca è terminata")
    except AttributeError:
        update.message.reply_text("La ricerca precedente è stata annullata")

def main():
    upd = Updater(TOKEN, use_context=True)
    disp = upd.dispatcher

    disp.add_handler(CommandHandler("get", GetData))
    disp.add_handler(CommandHandler("start", Start))

    upd.start_polling()
    upd.idle()


if __name__ == "__main__":
    main()
