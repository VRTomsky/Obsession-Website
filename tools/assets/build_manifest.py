"""Generates tools/assets/manifest.json (source list for the asset workflow)."""
import json
from pathlib import Path

T = "https://image.tmdb.org/t/p"
FP = "https://commons.wikimedia.org/wiki/Special:FilePath"

logos_en = """2y6qVk9YIPxTzO43anxUQ9iTuh4 krZ97fTqdAR6Ajuq1Mmz5YUuy6K fW5EdtasECvWHzh1m3jo55v5DLP vXo3Fd8Bl9v9OsHetfvwGGI6YGT
1C21y5qYw701rQYqoLuIE4u2se7 qEbbQ7j4huqPitvVBLWCZetDwaY 9o1ZdLqOSd4WF5L3J40gEkYf9m5 w8diOnk4nzt2xowlFx46HTZCnfA
pVrl7a7R9NsTRvCxlJDaW706EVe 5IIcZkdFyFN4dIZM2JcLUKn1vD3 zsQBN9IOUfq18HcDvhJIsXinEFh ealc5FR0xdq6Iw6OHIKF8u22myA
uEdRbTJwYYiEnb3ZDsAfV1vqZfC qRyJOnBEqmiaxkwgRgL5ylYBQcD""".split()
logos_de = ["i0WHy8rCGaoNdrBURaPf4BWmyso", "cFiQhnRsixxAIhk3wQQBErN16xR"]

posters = """bRwnj8WEKBCvmfeUNOukJPwB43K tUAnnLYRdq6vUZKteKiYpyud55A iR0eC0eIWB8OjZ9abBz4FepfwkC 7Var7KpENv7M2hcXsRV0ZoD8aYV
djKebVEdIxKHAVmrHV4OaxP1k29 dbPtgeyOmdmaGCVSUoBXhd9WiOz ltbokYTuV8jJTGEXVY1cwqP7RCm bnkdk4auJTBkrzqv1oLKtzCcFrE
wnyUBssII8ZRDjDRlUyXt6tX9rt cUnADM9fsYV69Fk0TkMp7xVLnKj 40I66L7QKguTFDPvcLcdiTbAD7I s6tr2Pe5ThHWpR97paieQHrH6z2
xrebZoKtSIDpYjVP00gC9oMOMi4 jKcvDsGuS5QBDdNQ1LoA69P0JYn voc1voLzT9laQtaxFFltJBxLSfY rBoZ8cuZbWgGV2YYKxdSO7cEN2E""".split()

stills = """5lTZyuBTNOfawsfPT8Q0cIg6qAF uoTZOIXnkcTgJe1emITpsQq7sPu diOZbaDnB2CIilwd0527AB1qMvW r013C8Me2bZ0pUi0OWJRh0h7MzT
4k99kV4R1bbbrsnjR205v91Xbin u5BkYDM5gfK4wINfoIFMAcEUKhx 7xZCxnhIB7XNwbJDoaNocFzGOmO 8Z4mNUnfhiOSYzcCw3yoGR7q2un
qDmeLX1NTCD7B2IbDhCEReJgmO8 eIw1YYdQ2ycsitUuiMa9ygzqgPm uXVj5lfXuUdXpDheQ9SHmwKuQta oICYZzr1arFtiaPrQfOTYZOOrCy
d40SQY5TXCF8NJN2C6FnxFHsOD4 fnASfC4pJ4NSzJ1ch7FBD99PiaZ 8nnO9zr2jUH2qH2PysbRQ1TMaye reRGz6r9EMpJfU6dRhKCEyyVGdl
15baaheTOxyJvnzFw8Xv8otes5g aJNHKRM5BiGroXGPDhrHeAnSWQ3 ovFpatjBA43fsjcWo5RRpq6r6Ou 5tb8XG7VtcATcbPduoixeL8mTiV
jJUYB1WUZhP3NbbdxLeC3ERNGK 3PIc1ToM2bNf19P2k1VlHC6i1Kt 7RLcx2keJIwgtvIBBsdhHcJ2uGr eWhTP9eynbbJVyRLstsGxa3AUn9
ksEGlrKcvdRPsRdLvbHKOSbtbAW coHxXUan9ZchwYPQzW5KRGkt1jj j8brS9jQanEE03DfALGIMNwILAR rsLAHmhPVxBBjBljlW0EIkkl7kr
gdjWz6yyjkavLgj0QNP3i2C5QMX sPvHEuDElSGDnYLxluAeye1uaoL uNpoAhXWlc6pdnvtKXyz3w94P0j rnTEXOBWdQQHOEaRvScJVbor3Xr
uydeUj6CJnpJnSvsuTKRiQ9x9iJ 5oNFCTxGGlOxC3Xinu3SFRAhIWd 1pKFDggvtk23zcn1vUcPiKyuHxM qPfWraW3mG2LNoMD1OEzANiJgAs
urEld5xLuj8HguMCYmbbxGzPn6U bjdNhEel7OYbJg4DpQbRWmG9aso duFUNjpN3N96mmfYGYJlgoPnaRP 9084VjayGQb5pXktjOo1obFAY4O
3BUCh9ov8bXCRNElOihubbvKwY yBdDgZOYVZnwvO0qIaLPRbMr0A1 x3juVjMMuWqEJYe71avkOkjWufm rnJNjnL4MxXn5h5d9GbcdCzHIim
ibCsVrEO985SlxTV5QDu3MUSluc vgkg56p5bywux0MwuMYDTrvpb7O avTBxnJ7huyU9p49z68e9QL06Cn xYOEUbdzI5puCrzhPLbhTY98KNx
jZWK76skGFJedZp8sr0IvIvtuds pZrgh4UlbY4rAim9GvL9l8UgXyH xJxGW0wfnNheuBsh7KGgwGo4bLP lBGeYf67obqteQ6ghrWn8Nt9NyR
vEH3EKY46KkdxY9VHetnegyHpRh pdNtpuYiVKNPCKd0J9OHTV2Losj jmmHPOOaoHpAwM45wrYpF7LMOph 8ZpIZvmXfWL31tSbBCl0P0Ei9IX
rFZBWDPU8QpAxOQq2tHIG8VWOOj q9rmQOxnPC0aYM5heh3jFdekrBg cZUgM1PuVUITrnaGKdQJiACSCrB kntR9bt5lw3XvUYIkrOEdnFPgKP
alWWTpRI3ZNry9HmuN8zr7xH8U sUHR4AVM0VHD9w10utB2Ha9mcFV 41eRId9jsG9O93ParZsnFrrp4hK di1aaGyFLs1Ho0IcMvv6Wh9nlaR
lqlEeNCpl1lXhGmGXIupPf1GYxx 5XOzVZ5SZsgNh12fVOMT6jbi6Vd""".split()

profiles = {
    "michael-johnston": "fbpcCkBzu43kMdlXxEAMuLhseL8 k8JsSAmOf7ie7NefcRlL4DCSwjn aFAbkoQXQuVqTFtifsCfxS2NCHR cAd88KTNwNTxnIsZVLlytOCcKBM",
    "inde-navarrette": "jy8owIkbSUNpDLFp6CFgdqXw2vw ayKQBpXkjtLWIKOaITO493NTqFk qlNBUGON8FebgzcqVhhRSVFYSa5 dOyn0C1bUIZiXy2Q4ws04kB1RhS "
                       "soRwMkDtOHE9TbNuBuBo6Nl2WTr 8mYBaOximzwBgXOYRzbS6eUnoMX hmW22IiOwH0ukCynzSEpWIFjNPg xcy0aztAGRlBJOhgmGjD8RrsdOZ "
                       "yqSYT0ifPKOkLHjmRun2e12LSXW GlyEqcM13XIKUQUjvThuPzY35h xdrqPulkjBc0d3E3FkzAA7Kzr3l qnxcI36tTQF1jEqkq9P2ItUL3XK",
    "cooper-tomlinson": "vBMQbYT1DyWPCUp11dIiqZR9zhd zMaffjqYxqKwB52sUfDdikEOlG5 v8iVBkW209qFEHYjSQK2ZMBkBjs",
    "megan-lawless": "6qW63YEgB1qro01sM7T2HvhtFkh lSpiDEjfF7YlUUXiFAjCBPEkhpV kOhHRpinPXVd8Up9MuACcfyJLQ1 5HJ5NvEXxQAQCr8KJb3vaByS4AZ 3hD6qhtYNZiYFFdP2hOkh1U0jsg",
    "andy-richter": "5Qr7N6TzC8cI0ULxDm6EC5GpZ4C zaURoCFYhzzgmJ2GYZqIkhWACm6 qazhLkyKOsPmdOQSaUWWbbUjs9q",
    "haley-fitzgerald": "xbKqZ5Epz0IaSCPLXDnByDACw2X xjMLAUWDz4brqnm3X6BPZfXbr0q tdwhaT8jpQ7tIZDUxtlOPzy1HKJ u6sQF2ziZOq8gfWZMzpFZ8o5U7a 9J7b8GDKo2DY545qZX3sMPpBKQA",
    "darin-toonder": "bD7Y9T7Y6XwDXjGJ8Suabyt1ZGo",
    "curry-barker": "A16CxGKlkQYryoxGpxzKj4Wxk83 aGaEbGc6QHwSh35yp5dCWzfiwDw 4rn1gS0tbVghrT4kQ4tiLLV0Q19 2l5l75FyGm27Csp7hXfMO6mrElv",
}

commons = """Obsession_cast_and_crew_at_the_2025_Toronto_International_Film_Festival.jpg
Obsessionban.png
Cooper_Tomlinson_at_the_2025_Toronto_International_Film_Festival_01.jpg
Cooper_Tomlinson_at_the_2025_Toronto_International_Film_Festival_02.jpg
Cooper_Tomlinson_at_the_2025_Toronto_International_Film_Festival_03.jpg
Cooper_Tomlinson_at_the_2025_Toronto_International_Film_Festival_04.jpg
Cooper_Tomlinson_at_the_2025_Toronto_International_Film_Festival_05_(cropped).jpg
Curry_Barker_2026_Century_City_(cropped).png
Curry_Barker_2026_Century_City.jpg
Curry_Barker_at_the_2025_Toronto_International_Film_Festival_(cropped).jpg
Curry_Barker_at_the_2025_Toronto_International_Film_Festival_peace_sign.jpg
Curry_Barker_at_the_2025_Toronto_International_Film_Festival.jpg
Curry_Barker,_Inde_Navarrette,_Michael_Johnston.jpg
Inde_Navarrette_2026_Century_City.jpg
Inde_Navarrette_at_the_2025_Toronto_International_Film_Festival_01.jpg
Inde_Navarrette_at_the_2025_Toronto_International_Film_Festival_02_(cropped).jpg
Inde_Navarrette_at_the_2025_Toronto_International_Film_Festival_03.jpg
Inde_Navarrette_in_2026_(cropped).jpg
Inde_Navarrette_in_2026.jpg
Inde_Navarrette_Obsession_Q&A_2026_Century_City.jpg
Megan_Lawless_at_the_2025_Toronto_International_Film_Festival_01.jpg
Megan_Lawless_at_the_2025_Toronto_International_Film_Festival_02.jpg
Megan_Lawless_at_the_2025_Toronto_International_Film_Festival_03.jpg
Megan_Lawless_at_the_2025_Toronto_International_Film_Festival_04.jpg
Megan_Lawless_at_the_2025_Toronto_International_Film_Festival_(cropped).jpg
Michael_Johnston_at_the_2025_Toronto_International_Film_Festival_01.jpg
Michael_Johnston_at_the_2025_Toronto_International_Film_Festival_02.jpg
Michael_Johnston_at_the_2025_Toronto_International_Film_Festival_03.jpg
Michael_Johnston_at_the_2025_Toronto_International_Film_Festival_04.jpg
Michael_Johnston_at_the_2025_Toronto_International_Film_Festival_05.jpg
Michael_Johnston_in_2026.jpg
Michael_Johnston_in_2026_Century_City.jpg
Michael_Johnston,_Curry_Barker,_Inde_Navarrette_(1).jpg
Michael_Johnston,_Curry_Barker,_Inde_Navarrette_(2).jpg
Obsession_Q&A_2026_Century_City.jpg
One_Wish_Willow_Toy_Replica_From_Obsession_(2025).jpg""".split("\n")

youtube = ["gMC8kkwbIQQ", "UWVznyWUS-E", "HaZsOipO-xE", "tYQgZc0N0cY", "Sw3QHS8VNhA", "KMVFpeSSZS0", "SWk93t-DEwA",
           "khIA3Y8Ci3A", "ZpeiXao2MS4", "l4YERhbntis", "JYWMQj-YlEk", "ILEbgnaFHlM", "GlbDPVE78oQ"]


def slug(name):
    import re
    base = name.rsplit(".", 1)[0]
    base = base.replace("_at_the_2025_Toronto_International_Film_Festival", "_tiff25")
    return re.sub(r"[^a-z0-9]+", "-", base.lower()).strip("-")


images = []
for i, h in enumerate(logos_en):
    images.append({"url": f"{T}/original/{h}.png", "out": f"public/media/logo/en-{i + 1:02d}.png", "max": 2400})
for i, h in enumerate(logos_de):
    images.append({"url": f"{T}/original/{h}.png", "out": f"public/media/logo/de-{i + 1:02d}.png", "max": 2400})
for i, h in enumerate(posters):
    images.append({"url": f"{T}/w780/{h}.jpg", "out": f"public/media/posters/p{i + 1:02d}.webp", "quality": 84})
for h in stills:
    images.append({"url": f"{T}/w1280/{h}.jpg", "out": f"public/media/stills/{h}.webp", "quality": 80})
for person, hs in profiles.items():
    for i, h in enumerate(hs.split()):
        images.append({"url": f"{T}/original/{h}.jpg", "out": f"public/media/people/{person}/tmdb-{i + 1:02d}.webp",
                       "max": 1000, "quality": 84})
for name in commons:
    ext = ".png" if name.endswith(".png") and "ban" in name else ".webp"
    images.append({"url": f"{FP}/{name}?width=1600", "out": f"public/media/commons/{slug(name)}{ext}", "max": 1600,
                   "quality": 84})
for vid in youtube:
    images.append({"url": f"https://i.ytimg.com/vi/{vid}/maxresdefault.jpg", "out": f"public/media/yt/{vid}.webp",
                   "quality": 80})
    images.append({"url": f"https://i.ytimg.com/vi/{vid}/hqdefault.jpg", "out": f"public/media/yt/{vid}-hq.webp",
                   "quality": 80})

videos = [
    {"id": "trailer", "sources": ["https://www.youtube.com/watch?v=gMC8kkwbIQQ"], "sheet": True, "clips": []},
    {"id": "freaky-nikki", "sources": ["https://www.youtube.com/watch?v=HaZsOipO-xE"], "sheet": True, "clips": []},
    {"id": "wish-preview", "sources": ["https://www.youtube.com/watch?v=tYQgZc0N0cY"], "sheet": True,
     "sheet_fps": 0.5, "clips": []},
]

out = Path(__file__).with_name("manifest.json")
out.write_text(json.dumps({"images": images, "videos": videos}, indent=1))
print(len(images), "images,", len(videos), "videos")
