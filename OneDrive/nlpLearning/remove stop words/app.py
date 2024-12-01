import nltk
nltk.download()

with open( 'texto.txt', 'r', encoding = 'utf-8') as file:
  texto = file.read()

from nltk import word_tokenize
word_tokenized = word_tokenize(texto)
print(word_tokenized)

from nltk import sent_tokenize
print(sent_tokenize(texto))

from nltk.probability import FreqDist
fd = FreqDist(word_tokenize(texto))
print(fd.most_common(10))

import matplotlib.pyplot as plt
fd.plot(30, cumulative = False)
plt.show()

from nltk.corpus import stopwords
stop_words = stopwords.words('portuguese')
print(stop_words)

text_wo_stop_words = []
for word in word_tokenized:
  if word not in stop_words:
    text_wo_stop_words.append(word)
print(text_wo_stop_words)

import pandas as pd
df = pd.DataFrame(text_wo_stop_words)
df.to_csv('output.csv', index = False)
