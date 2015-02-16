# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re
import csv, sys, argparse

# iterate over csv rows
def csvreader(ifile, **kwargs):
    rownum = 0
    #ifile = open('test.csv', "rb")
    ifile = open(ifile, 'rb') # opens the csv file
    reader = csv.reader(ifile, delimiter=';', **kwargs)
    for row in reader:
        rownum += 1
        if(rownum <= 1): continue   # skip header row (assumed)
        yield row[0]

# sys.exit(0)

class ResendResultsBatch(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "https://test.assessio.com/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_resend_login(self):
        rownum = 0
        # global csv_file
        # global csvreader
        driver = self.driver
        driver.get(self.base_url + "/login.aspx")
        driver.find_element_by_id("txtUsername").clear()
        driver.find_element_by_id("txtUsername").send_keys("dan.kopparhedSA")
        driver.find_element_by_id("txtPassword").clear()
        driver.find_element_by_id("txtPassword").send_keys("secret")
        driver.find_element_by_id("btnLogin").click()
        # self.test_resend_results_batch(self)

        # for uid in range (101, 105):
        print ("Now resending userid: ")
        header = csvreader(args.input)
        for uid in csvreader(args.input):
            rownum += 1
            sys.stdout.write(uid+" ")
            sys.stdout.flush()
            driver.get(self.base_url + "/adminfirstpage.aspx")
            driver.find_element_by_id("txtResendWSUserName").clear()
            driver.find_element_by_id("txtResendWSUserName").send_keys(uid)
            driver.find_element_by_id("btnWSResend").click()
            # time.sleep(1)

        print "\nRe-sent %s number of user results", rownum

    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException, e: return False
        return True
    
    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException, e: return False
        return True
    
    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True
    
    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--input', default='My Input')
    # parser.add_argument('filename', default='some_file.txt')
    parser.add_argument('unittest_args', nargs='*')

    args = parser.parse_args()
    # print args.input
    # TODO: Go do something with args.input and args.filename

    # Now set the sys.argv to the unittest_args (leaving sys.argv[0] alone)
    sys.argv[1:] = args.unittest_args
    unittest.main()
