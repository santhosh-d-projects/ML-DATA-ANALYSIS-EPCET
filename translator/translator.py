from googletrans import Translator

translator = Translator()

text = input("Enter text in English: ")

result = translator.translate(text, src="en", dest="hi")

print("Translated Text:", result.text)