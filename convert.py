#!/usr/bin/env python

import sys
import getopt
import gettext
import json


def main(argv):
    inputfile = ''
    outputfile = ''
    try:
        opts, args = getopt.getopt(argv, "hi:o:", ["ifile=", "ofile="])
    except getopt.GetoptError:
        print 'test.py -i <inputfile> -o <outputfile>'
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-h':
            print 'test.py -i <inputfile> -o <outputfile>'
            sys.exit()
        elif opt in ("-i", "--ifile"):
            inputfile = arg
        elif opt in ("-o", "--ofile"):
            outputfile = arg
    if not inputfile:
        print 'test.py -i <inputfile> -o <outputfile>'
        sys.exit()

    with open(inputfile) as ifile:
        catalog = gettext.GNUTranslations(ifile)._catalog

    del catalog['']
    output = json.dumps(catalog)
    if outputfile:
        with open(outputfile, 'w') as ofile:
            ofile.write(output)
    else:
        print output

if __name__ == "__main__":
    main(sys.argv[1:])
