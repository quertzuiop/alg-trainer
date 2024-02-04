import tkinter as tk
from tkinter import ttk

master= tk.Tk()
master.title("OLL Generator")
for x in range(3):
    for y in range(3):
        ttk.Checkbutton(master, onvalue=1, offvalue=0).grid(column=3*x, row=3*y+1)
        ttk.Checkbutton(master, onvalue=1, offvalue=0).grid(column=3*x+2, row=3*y+1)
        ttk.Checkbutton(master, onvalue=1, offvalue=0).grid(column=3*x+1, row=3*y)
        ttk.Checkbutton(master, onvalue=1, offvalue=0).grid(column=3*x+1, row=3*y+2)
        ttk.Checkbutton(master, onvalue=1, offvalue=0).grid(column=3*x+1, row=3*y+1)

master.mainloop()