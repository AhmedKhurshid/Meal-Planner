export enum RESPOSE_CODE_MESSAGE {
  REGISTERSUCCESSFULL = 'Register Successfully',
  SERVICENOTEXIST = 'Service does not exist',
  COURTSMISSING = 'Invalid Court',
  OTPVERIFIED = 'Code is verified',
  COURTDOESNOTEIST = 'Court is required',
  EMAILALREADYEXISIT = 'Email already exist',
  LAWYERALREADYEXISIT = 'Lawyer already exist',
  LAWYERCLIENTNOTEXISIT = 'Lawyer client does not exist',
  LAWYERTEAMNOTEXISIT = 'Lawyer team does not exist',
  SPECIALIZATIONNOTEXISIT = 'Specialization does not exist',
  APPOINTMENTNOTEXISIT = 'Appointment does not exist',
  SPECIALIZATIOEXISITYUSER = 'Specialization exist in user',
  LAWYERNOTEXISIT = 'Lawyer does not exist',
  USERNOTEXISIT = 'User does not exist',
  TIMESCHEDULENOTEXISIT = 'Time schedule does not exist',
  APPOINTMENTALREADY = 'Appointment already booked this date or time',
  STARTTIMEORENDTIME = 'StartTime or EndTime are not same',
  Wait = 'User is not Active',
  PASSWORDNOTMATCH = 'Password and confirm password does not match',
  STUDENTLOGIN = 'Only Student can login',
  UPDATEDPASSWORD = 'Your password has been updated',
  CODENOTMATCH = 'Wrong Code',
  ADMINLOGIN = 'Only admin can login',
  INVALID = 'Email or password is incorrect',
  INVALIDPASSWORD = 'Old password is incorrect',
  SAMEPASSWORD = 'Old password or new password are same',
  SUCCESSFULL = 'Login Successfully',
  FILEUPLOADED = 'File uploaded sucessfully',
  FILEREQURIED = 'File is requried',
  NAMEALREADYEXISIT = 'Title already exist',
  ALREADYSAVE = 'CaseLaw is already save',
  CASELAWSAVE = 'CaseLaw does not exist',
  SERVICENAMEALREADYEXISIT = 'Name already exist',
  COURTDOESNOT = 'Court does not exist',
  BOOKADD = 'Book added Successfully',
  SPECIALIZATION = 'Specialization create Successfully',
  COURT = 'Court create Successfully',
  BOOK = 'Book does not exist',
  CASELAW = 'Caselaw does not exist',
  CAUSE = 'Cause does not exist',
  CASES = 'Case does not exist',
  CAUSELIST = 'Cause list does not exist',
  ACCEPT = 'Successfull',
  TEAMAREADYTASK = 'Team member is already in task',
  TASK = 'Task does not exist',
  UPDATE = 'Update successfully',
  CLIENTNOTUPDATE = 'Client status not Update,because client already in case',
  DELETE = 'Deleted successfully',
  LAWYERCASE = 'Lawyer Case does not exist',
  NEWSFOUND = 'News Found',
  MEALPLANNOTFOUND = 'Meal plan not Found',
  MEALNOTFOUND = 'Meal not Found',
  NEWSCREATED = 'News created',
  NEWSUPDATEDTED = 'News updated',
  NEWSDELETED = 'News deleted',
  LAWYERREQUEST = 'Lawyer request does not exist',
  TASKNOTEXIST = 'Task does not exist',
  TEAMMEMBERNOT = 'Team member not allow to change status',
  NOREQUEST = 'Request does not exist',
  TEAMMEMBER = 'Team or Lawyer not same',
  REQUEST = 'Request not found',
  FORGETCODE = 'Forget password code send on your email',
  APPOINTMENTMESSAGE = '',
  NOTIFICATION = 'Notification does not exist',
  CLIENT = 'Client status is not Active',

  NOTFOUND = 'Item not found',
  NEWITEM = 'New Item Added',

  NEWVENDOR = 'New vendor added',
  NOVENDOR = 'Vendor not found',
  VENDORFOUND = 'Vendor found',
  VENDORUPDATED = 'Vendor Updated',

  NEWMEALPLAN = 'New Meal plan added',
  MEALPLANFOUND = 'Meal plan found',
  NOMEALPLANFOUND = 'Meal plan not found',
  MEALPLANUPDATED = 'Meal plan Updated',
  MEALPLANALREADYEXIT = 'Meal plan already exit',
  DATEERROR = 'Date Should be current or later than today ',
  PREVIOUSDATE = 'Can not delete the older meal plan',



  NEWALLERGY = 'Allergy plan added',
  ALLERGYFOUND = 'Allergy found',
  ALLERGYNOTFOUND = 'Allergy not found',
  ALLERGYALLREADYEXIST = "Allergy already exit",
  ALLERGYUPDATED = 'Allergy Updated',
  // MEALPLANNOTFOUND = 'Meal plan not Found',
  // MEALNOTFOUND='Meal not found',
  NEWREQUEST = "Payment request has been send",

  SOMETHINGWENTWRONG = 'Something wrong',

  NEWSFOUNDALREADYCREATED = 'News already exists',
  ORDERED = 'Meal Ordered successfully',
  ALREADYORDERED = 'Meal already ordered',
  TODAYMEALALREADYORDERED = "You have already placed today's order.",
  ORDEREDTIMEOVER = 'Unfortunately Meal cancellation time over',
  USERNOTFOUND = 'User not Found',
  TYPENOTFOUND = 'Type not found',
  TYPEUSEDINSTUDENT = 'Type used in student',

  MAXTWOQUANTITYCANORDER = 'Maximum two quantity with one item can order',
  ORDERPLACETIME = "Unfortunately this time you can't place order meal",

  ORDERTIMESCHEDULECREATED = 'Order time schedule created successfully',
  ORDERTIMESCHEDULEUPDATED = 'Order time schedule updated successfully',
  ORDERTIMESCHEDULENOTFOUND = 'Order time schedule not found',
  ORDERTIMESCHEDULEFOUND = 'Order time schedule found',

}