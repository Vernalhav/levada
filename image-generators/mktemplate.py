import sys


def main():
    if  len(sys.argv) != 2:
        print('incorrect usage. use python3 mktemplate <figure name>')
    
    with open('template.ts') as f:
        template = f.read()

        figureName = sys.argv[1]
        imageName = figureName + 'Image'
        imagePath = './' + figureName + '.png'

        new_buffer = template.format(imageName=imageName, imagePath=imagePath, figureName=figureName)

        with open('index.ts', 'w') as output:
            output.write(new_buffer)


if __name__ == '__main__':
    main()