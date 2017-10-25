from app import create_app

application = create_app('default')


if __name__ == '__main__':

    import argparse
    import os

    application.secret_key = "got bod?"
    parser = argparse.ArgumentParser()
    parser.add_argument('-prod',action = 'store_true')

    args = parser.parse_args()

    if args.prod:

        port = int(os.environ.get('PORT', 5000))

        application.run(host='0.0.0.0', port=5000, debug=False)
    else:
        application.run(debug=True)
