
def parse(file):
    with open(file) as file:
        monkeys = dict()
        for line in file.read().splitlines():
            split = line.split(": ")
            name = split[0]
            job = split[1]
            if job.isdecimal():
                job = int(job)
            else:
                job = job.split(" ")
            monkeys[name] = job
        return monkeys


def compute(name, monkeys):
    job = monkeys[name]
    if type(job) == int:
        return job
    operator, val1, val2 = job[1], compute(
        job[0], monkeys), compute(job[2], monkeys)
    result = None
    if operator == "+":
        result = val1 + val2
    elif operator == "-":
        result = val1 - val2
    elif operator == "*":
        result = val1 * val2
    elif operator == "/":
        result = val1 / val2
    monkeys[name] = result
    return result


def solve(monkeys: dict):
    return compute("root", monkeys)


monkeys = parse("input.txt")
print(solve(monkeys))
