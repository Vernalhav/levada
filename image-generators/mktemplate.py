import sys
import json
import os


TAB_LEN = 4

def main():
    if  len(sys.argv) != 2:
        print('incorrect usage. use python3 mktemplate <figure name>')
        return

    current_rhythm = None
    ly_rhythm = None
    levada_rhythm = None
    
    figure_name = sys.argv[1]
    image_name = figure_name + 'Image'
    image_path = './' + figure_name + '.png'
    figure_dir = figure_name[:1].upper() + figure_name[1:]

    with open('rhythms_data.json') as rhythms:
        try:
            current_rhythm = json.load(rhythms)[figure_name]
            ly_rhythm = current_rhythm['ly_rhythm']
            levada_rhythm = current_rhythm['levada_rhythm']
        except:
            console.log(f'Missing information on rhythm {figure_name} in rhythms_data.json')
            return
        
    # Writes lilypond template in correct directory
    with open('template.ly') as f:
        template = f.read()
        new_buffer = template.format(ly_rhythm=ly_rhythm)
        os.mkdir(figure_dir)
        with open(os.path.join(figure_dir, figure_name + '.ly'), 'w') as output:
            output.write(new_buffer)


    # Writes typescript template
    with open('template.ts') as f:
        template = f.read()
        
        first_element = levada_rhythm[0]
        first_string = f"{{ type: '{first_element['type']}', duration: {first_element['duration']} }},"
        rhythm_array = [first_string]

        for rhythm_element in levada_rhythm[1:]:
            rhythm_string = 2*TAB_LEN*' ' + f"{{ type: '{rhythm_element['type']}', duration: {rhythm_element['duration']} }},"
            rhythm_array.append(rhythm_string)

        rhythm_string = '\n'.join(rhythm_array)
        new_buffer = template.format(imageName=image_name, imagePath=image_path, figureName=figure_name, rhythm=rhythm_string)

        with open('rhythmic_figure_index.ts', 'w') as output:
            output.write(new_buffer)


if __name__ == '__main__':
    main()