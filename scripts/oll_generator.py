import tkinter as tk
from tkinter import ttk
import xml.etree.ElementTree as ET
from xml.dom import minidom
import os

print(os.getcwd())
rects = [
    [None, "1412", "1412-7", "1412-6", None],
    ["1412-1-7", "1198", "1198-9", "1198-2", "1412-1"],
    ["1412-7-9-4", "1198-5", "1198-22", "1198-7", "1412-7-9"],
    ["1412-6-55-3", "1198-1", "1198-17", "1198-221", "1412-6-55"],
    [None, "1412-69", "1412-7-5", "1412-6-5", None]
]
base_color = "fill:#323232;"
selected_color = "fill:#ffff32ff;"
master= tk.Tk()
master.title("OLL Generator")
colors = [[tk.BooleanVar() for _ in range(5)]for _ in range(5)]


def updatec(x, y, val):
    colors[x][y] = val


def create_img():
    #print([[i.get() for i in l] for l in colors])
    doc = minidom.parse("base-cube.svg")
    for i, row in enumerate(rects):
        for j, r in enumerate(row):
            if r != None:
                for tile in doc.getElementsByTagName("rect"):
                    if tile.getAttribute("id") == "rect"+r:
                        style = tile.getAttribute("style")
                        print([base_color, selected_color][colors[i][j].get()] + tile.getAttribute("style")[-103:])
                        tile.setAttribute("style", [base_color, selected_color][colors[i][j].get()] + tile.getAttribute("style")[-103:])
                        #print(tile.getAttribute("style").split(";")[1:])
    with open("../oll_img/57.svg", "w") as f:
        f.write(doc.toxml())
    master.destroy()


for x in range(5):
    for y in range(5):
        if 0 < x < 4 or 0 < y < 4:
            c = ttk.Checkbutton(master, onvalue=1, offvalue=0, state="1", variable=colors[x][y])
            c.state(['!alternate'])
            c.grid(row=x, column=y, sticky="nsew")
done = ttk.Button(text="Done", command=create_img)
done.grid(row=6, column=0, columnspan=10)

master.mainloop()