import sys
import json


TAB_LEN = 4

def main():
    if  len(sys.argv) != 2:
        print('incorrect usage. use python3 mktemplate <figure name>')
        return
    
    with open('template.ts') as f:
        template = f.read()

        figure_name = sys.argv[1]
        image_name = figure_name + 'Image'
        image_path = './' + figure_name + '.png'

        with open('rhythms_data.json') as rhythms:
            try:
                current_rhythm = json.load(rhythms)[figure_name]["levada_rhythm"]
            except:
                console.log(f'Missing information on rhythm {figure_name} in rhythms_data.json')
                return
            
            first_element = current_rhythm[0]
            first_string = f"{{ type: '{first_element['type']}', duration: {first_element['duration']} }},"
            rhythm_array = [first_string]

            for rhythm_element in current_rhythm[1:]:
                rhythm_string = 2*TAB_LEN*' ' + f"{{ type: '{rhythm_element['type']}', duration: {rhythm_element['duration']} }},"
                rhythm_array.append(rhythm_string)

            rhythm_string = '\n'.join(rhythm_array)
            new_buffer = template.format(imageName=image_name, imagePath=image_path, figureName=figure_name, rhythm=rhythm_string)

            with open('index.ts', 'w') as output:
                output.write(new_buffer)


if __name__ == '__main__':
    main()