import random


def guess_the_number():
    number_to_guess = random.randint(1, 10)
    attempts = 3

    print("Я загадал чесло попробй угадать")

    while attempts > 0:
        guess = int(input("Ваш вариант: "))

        if guess == number_to_guess:
            print("Вы угадали")
            return

        elif guess > number_to_guess:
            print("менще")

        else:
            print("больще")

        attempts -= 1


    print("Вы проиграли я загадал число", number_to_guess)

guess_the_number()
