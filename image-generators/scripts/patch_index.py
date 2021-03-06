import sys
import os

TAB_LEN = 4

def main():
    if  len(sys.argv) != 2:
        print('incorrect usage. use python3 patch_index <figure name>')
        return

    with open('index.ts') as f:        
        lines = f.readlines()
        stray_newlines = [ i for i in range(len(lines)) if lines[i] == '\n' ]

        figure_name = sys.argv[1]
        figure_dir = figure_name[:1].upper() + figure_name[1:]

        for line in lines:
            if len(line.split()) < 1: break
            if line.split()[0] != 'import' and '//' not in line: break
            if line.split()[1] == figure_name or line.split()[2] == figure_dir:
                print(('Rhythmic figure already exists in index.ts ...aborting.\n'
                        'File should be updated properly, but in the future, '
                        f'try running make update SOURCE={figure_name} instead'))
                return 1

        with open('patchfile', 'w') as patch:
            end_import_line = stray_newlines[0]
            end_object_line = stray_newlines[-1]

            patchlines = [
                f'{end_import_line}a{end_import_line+1}\n',
                f"> import {figure_name} from './{figure_dir}';\n"
                f'{end_object_line-1}a{end_object_line+1}\n',
                '> ' + 1*TAB_LEN*' ' + f"{figure_name}: {figure_name},\n"
            ]

            patch.writelines(patchlines)
    return 0


if __name__ == '__main__':
    ret_val = main()
    if ret_val == 1: os.remove('index.ts')
    exit(ret_val)