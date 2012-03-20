#import "ApplicationMods.h"

@implementation ApplicationMods

+ (NSArray*) compiledMods
{
	NSMutableArray *modules = [NSMutableArray array];
	[modules addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"gesturerecognizer",@"name",@"jp.msmc.gesturerecognizer",@"moduleid",@"1.2",@"version",@"feebd8e2-d709-4a4d-afb4-2c996535b0bb",@"guid",@"",@"licensekey",nil]];
	return modules;
}

@end
