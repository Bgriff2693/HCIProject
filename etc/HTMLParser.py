__author__ = 'Seth'

import urllib2
from BeautifulSoup import BeautifulSoup
import json

# tracks = ['CORE', 'Algorithms and Theory', 'Systems', 'Software', 'Information and intelligent Systems']
# cids = [['CSCE 181', 'CSCE 121', 'CSCE 222', 'CSCE 221', 'CSCE 312', 'CSCE 314', 'CSCE 313', 'CSCE 315', 'CSCE 481', 'CSCE 482'], ['CSCE 411', 'CSCE 433', 'CSCE 440', 'CSCE 442'], ['CSCE 410', 'CSCE 456', 'CSCE 462', 'CSCE 463', 'CSCE 464', 'CSCE 465', 'CSCE 469'], ['CSCE 431', 'CSCE 432', 'CSCE 434', 'CSCE 435', 'CSCE 438'], ['CSCE 310', 'CSCE 420', 'CSCE 436', 'CSCE 441', 'CSCE 443', 'CSCE 444', 'CSCE 445', 'CSCE 452', 'CSCE 470']]

# tracks = ['MATH & STAT']
# cids = [['MATH 151', 'MATH 152', 'MATH 304', 'MATH 251', 'MATH 302', 'MATH 308']]
# cids = [['STAT 211']]

tracks = ['COMMUNICATION']
# cids = [['ENGL 104', 'ENGL 210']]
cids = [['COMM 203', 'COMM 205']]

# tracks = ['LANG, PHIL & CULT']
# cids = [['ENGR 482']]

# tracks = ['SCIENCE']
# cids = [['CHEM 101', 'CHEM 111', 'CHEM 102', 'CHEM 112']]
# cids = [['PHYS 218', 'PHYS 208']]
# cids = [['BIOL 111', 'BIOL 112']]
# cids = [['GEOL 101', 'GEOL 106']]

# tracks = ['GOV/POLITICAL SCI']
# cids = [['POLS 206', 'POLS 207']]

filename = 'comm.html'

class Course(object):
    associated_term = ""
    professor = ""
    website = ""
    levels = ""
    lab = False
    credits = 0
    meeting_times = []
    section = 0
    crn = 0
    name = ""
    course_name = ""
    taken = False

    def __init__(self, associated_term, professor, website, meeting_times, credits, name, crn, cid, sec):
        self.associated_term = associated_term
        self.professor = professor
        self.website = website
        self.meeting_times = meeting_times
        self.credits = credits
        self.crn = crn
        self.name = name
        self.course_name = cid
        self.section = sec

    def __repr__(self):
        return "<Course Associated Term:%s, Professor:%s, Website:%s, Name:%s, CID:%s, Section:%s CRN:%s Credits:%s, Meeting Times:%s>" % (self.associated_term, self.professor, self.website, self.name, self.course_name, self.section, self.crn, self.credits, self.meeting_times)

class Classtime(object):
    type = ""
    time = ""
    days = ""
    location = ""
    date_range = ""
    schedule_type = ""
    professor = ""

    def __repr__(self):
        return "<Type:%s, Time:%s, Days:%s Professor:%s, Where:%s, Date Range:%s>" % (self.type, self.time, self.days, self.professor, self.location, self.date_range)

for num in range(0, cids.__len__()):
    for num2 in range(0, cids[num].__len__()):
        if __name__ == "__main__":
            print ('Processing class: ' + cids[num][num2])
            page = open(filename, 'r')
            soup = BeautifulSoup(page)

            courses = soup.findAll("th", {"class": "ddtitle"})
            course_details = soup.findAll("td", {"class": "dddefault"})

            course_directory = []
            for course in courses:
                x = course.a.contents
                # print (str(x).replace('[u\'', '').replace('\']', '')).replace("&amp;", "&")
                course_directory.append(str(x).replace('[u\'', '').replace('\']', '').replace("&amp;", "&"))

            for course in course_details:
                x = course.contents

            course_array = []
            meeting_times = []
            truth = 0
            course_index = 0
            x = 0
            while x < course_details.__len__():
                if x >= 2051:
                    f = 0
                split_tr = str(course_details[x].contents).replace("[u\'\\n\', ", "").split(",")
                # print(split_tr)

                for i in range(0, split_tr.__len__()):

                    #All the important header data
                    if split_tr[i].__contains__("Associated Term:"):
                        truth += 1
                        if x > 0:
                            times = meeting_times
                            classinfo = str(course_directory[course_index]).split(" - ")
                            try:
                                professor
                            except:
                                professor = ""
                                website = ""
                            course_array.append(Course(associated_term, professor, website, times, credits, classinfo[0], classinfo[1], classinfo[2], classinfo[3]))
                            meeting_times = []
                            course_index += 1

                        associated_term = str(split_tr[i+1]).replace('u\'', '').replace(' \\n','')
                    if split_tr[i].__contains__("Instructors:"):
                        temp = split_tr[i+2].split('>')
                        if temp.__len__() > 1:
                            website = temp[0].replace(" <a href=\"", "").replace("\" target=\"_blank\"", "")
                            professor = temp[1].replace("</a","")
                        else:
                            profs = split_tr[i+1].replace("\\n", "")
                            j = i+1
                            while not profs.__contains__("\\n"):
                                profs += ", " + split_tr[j+1]
                                j += 1
                    if split_tr[i].__contains__("Credits"):
                        credits = split_tr[i].replace(" ", "").replace("u", "").replace("Credits", "").replace("\\n", "").replace("\'","")
                    #Get all important table data (Class times)
                    if split_tr[i].__contains__("Lecture") or split_tr[i].__contains__("Laboratory") or split_tr[i].__contains__("Research"):
                        if not split_tr[i].__contains__("and") and not split_tr[i].__contains__("Type"):
                            classtime = Classtime()
                            classtime.type = str(course_details[x].contents).replace("[u\'", "").replace("\']", "").replace("[\"","").replace("\"]","")
                            if classtime.type.__contains__("Associated Term"):
                                x += 1
                                classtime.type = str(course_details[x].contents).replace("[u\'", "").replace("\']", "").replace("[\"","").replace("\"]","")
                            if classtime.type.__contains__("Primary"):
                                x += 1
                                classtime.type = str(course_details[x].contents).replace("[u\'", "").replace("\']", "").replace("[\"","").replace("\"]","")
                            classtime.time = str(course_details[x+1].contents).replace("[u\'", "").replace("\']", "")
                            classtime.days = str(course_details[x+2].contents).replace("[u\'", "").replace("\']", "")
                            classtime.location = str(course_details[x+3].contents).replace("[u\'", "").replace("\']", "")
                            classtime.date_range = str(course_details[x+4].contents).replace("[u\'", "").replace("\']", "")
                            classtime.schedule_type = str(course_details[x+5].contents).replace("[u\'", "").replace("\']", "")
                            classtime.professor = str(course_details[x+6].contents).replace("[u\'", "").replace(" (\'","").replace("\']", "").split(",")[0]
                            x += 6
                            meeting_times.append(classtime)

                x += 1

            dictionary = []
            class_name = ''
            for course in course_array:
                # print(course)
                data = {}
                if class_name != course.course_name:
                    class_name = course.course_name

                    data['CID'] = course.course_name
                    data['credits'] = course.credits
                    data['taken'] = course.taken
                    data['prequisite'] = ""
                    data['avgGPA'] = ""
                    #data['subject'] = "math"
                    data['track'] = tracks[num]
                    section = []

                    done = False

                    for c in course_array:
                        if c.course_name == class_name:
                            section_data = {}
                            section_data['honors'] = False
                            name = c.name
                            if name[:3] == "HNR":
                                section_data['honors'] = True
                            section_data['section_number'] = c.section
                            section_data['professor'] = c.professor
                            section_data['website'] = c.website
                            #data['term'] = course.associated_term
                            section_data['CRN'] = c.crn

                            meeting_data = []
                            for meeting in c.meeting_times:
                                temp = {}
                                temp['type'] = meeting.type
                                if str(meeting.time).__contains__("TBA"):
                                    temp['time'] = "TBA"
                                else:
                                    temp['time'] = meeting.time
                                temp['days'] = meeting.days
                                if str(meeting.location).__contains__("TBA"):
                                    temp['location'] = "TBA"
                                else:
                                    temp['location'] = meeting.location
                                temp['date_range'] = meeting.date_range
                                temp['schedule_type'] = meeting.schedule_type
                                temp['professor'] = meeting.professor
                                meeting_data.append(temp)
                            section_data['meeting_times'] = meeting_data
                            section.append(section_data)
                            #done = True

                        if done:
                            break

                    if course.name[:4] == "HNR-":
                        course.name = course.name[4:]
                    data['name'] = course.name
                    data['section'] = section




                #if data != {}:
                    dictionary.append(data)

            all_data = {}
            all_data['courses'] = dictionary
            json_data = json.dumps(all_data)
            # print(json_data)


            scoped_dictionary = []
            rfile = open('../client/assets/json/degree_plan.json', 'r')

            degree_plan = json.load(rfile)
            #print(degree_plan['courses'])
            wfile = open('../client/assets/json/degree_plan.json', 'w')

            # print(all_data['courses'])
            for data in all_data['courses']:
                # print("Prnt ")
                # print(data)
                if data['CID'] == cids[num][num2]:
                    scoped_dictionary.append(data)
            scoped_data = {}
            scoped_data['courses'] = scoped_dictionary
            if scoped_dictionary.__len__() > 0:
                degree_plan['courses'].append(scoped_dictionary[0])
            # print(degree_plan)
            json_data = json.dumps(degree_plan)

            print ('Success!')
            #print(rfile.read())
            wfile.write(json_data)
            rfile.close()
            wfile.close()
